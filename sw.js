const APP_VERSION = 'v13';
const CACHE_NAME = `recyclecheck-${APP_VERSION}`;
const urlsToCache = [
  './',
  './index.html',
  './manifest.json?v=13',
  './style.css?v=13',
  './script.js?v=13'
];

function isLocalDevelopment(url) {
  return ['localhost', '127.0.0.1', '[::1]'].includes(url.hostname);
}

self.addEventListener('install', event => {
  console.log(`[SW] Installing ${CACHE_NAME}`);
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  console.log(`[SW] Activating ${CACHE_NAME}`);
  event.waitUntil(
    Promise.all([
      caches.keys().then(cacheNames => Promise.all(
        cacheNames
          .filter(cacheName => cacheName !== CACHE_NAME)
          .map(cacheName => {
            console.log('[SW] Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          })
      )),
      self.clients.claim()
    ])
  );
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;

  const requestUrl = new URL(event.request.url);
  if (!requestUrl.protocol.startsWith('http')) return;

  if (isLocalDevelopment(requestUrl)) {
    event.respondWith(fetch(event.request, { cache: 'no-store' }));
    return;
  }

  const isHtmlRequest = event.request.mode === 'navigate'
    || requestUrl.pathname.endsWith('/')
    || requestUrl.pathname.endsWith('/index.html');

  if (isHtmlRequest) {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          const responseToCache = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, responseToCache));
          return response;
        })
        .catch(() => caches.match(event.request).then(cached => cached || caches.match('./index.html')))
    );
    return;
  }

  event.respondWith(
    caches.match(event.request).then(cached => {
      const fetchPromise = fetch(event.request).then(response => {
        if (response && response.status === 200 && response.type === 'basic') {
          const responseToCache = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, responseToCache));
        }
        return response;
      });

      return cached || fetchPromise;
    })
  );
});
