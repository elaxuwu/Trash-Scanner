// Service Worker for RecycleCheck PWA

const CACHE_NAME = 'recyclecheck-v1';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json'
];

// Install event
self.addEventListener('install', event => {
  console.log('[SW] Installing Service Worker...');
  // Activate immediately
  self.skipWaiting();
});

// Activate event
self.addEventListener('activate', event => {
  console.log('[SW] Activating Service Worker...');
  event.waitUntil(
    Promise.all([
      // Clean up old caches
      caches.keys().then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            if (cacheName !== CACHE_NAME) {
              console.log('[SW] Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      }),
      // Take control of all pages immediately
      self.clients.claim()
    ])
  );
});

// Fetch event (Network-first strategy)
self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request)
      .then(response => {
        // Clone the response to store in cache
        const responseToCache = response.clone();
        caches.open(CACHE_NAME).then(cache => {
          cache.put(event.request, responseToCache);
        });
        return response;
      })
      .catch(() => {
        // If network fails, try to get from cache
        return caches.match(event.request);
      })
  );
});
