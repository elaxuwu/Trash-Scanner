// Service Worker for RecycleCheck PWA

const CACHE_NAME = 'recyclecheck-v2';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  './style.css',
  './script.js'
];

// Install event - Thực hiện lưu cache các tài nguyên cốt lõi khi cài đặt app
self.addEventListener('install', event => {
  console.log('[SW] Installing Service Worker & Pre-caching assets...');
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
  self.skipWaiting();
});

// Activate event - Dọn dẹp cache cũ khi có version mới
self.addEventListener('activate', event => {
  console.log('[SW] Activating Service Worker...');
  event.waitUntil(
    Promise.all([
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
      self.clients.claim()
    ])
  );
});

// Fetch event (Network-first strategy cho tài nguyên, bỏ qua POST API)
self.addEventListener('fetch', event => {
  // CHÍ MẠNG FIX: Chỉ xử lý cache với phương thức GET và link http/https
  if (event.request.method !== 'GET' || !event.request.url.startsWith('http')) {
    return; // Bỏ qua, để mặc định trình duyệt xử lý qua mạng thông thường (Luồng API OpenAI sẽ an toàn)
  }

  event.respondWith(
    fetch(event.request)
      .then(response => {
        // Nếu response hợp lệ, clone và cập nhật vào cache
        if (response && response.status === 200 && response.type === 'basic') {
          const responseToCache = response.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, responseToCache);
          });
        }
        return response;
      })
      .catch(() => {
        // Nếu mất mạng hoàn toàn, tìm file tương ứng trong bộ nhớ cache
        return caches.match(event.request);
      })
  );
});
