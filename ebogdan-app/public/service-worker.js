const CACHE_NAME = 'ebogdan-cache-v1';
const OFFLINE_URL = '/index.html';

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll([OFFLINE_URL]);
    })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.map((key) => {
        if (key !== CACHE_NAME) return caches.delete(key);
        return Promise.resolve();
      }))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const request = event.request;
  const url = new URL(request.url);

  // Navigation requests: network first, fallback to cached index.html
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request).then((response) => {
        return response;
      }).catch(() => caches.match(OFFLINE_URL))
    );
    return;
  }

  // Cache-first for images, styles and assets
  if (request.destination === 'image' || request.destination === 'style' || url.pathname.startsWith('/assets/')) {
    event.respondWith(
      caches.open(CACHE_NAME).then((cache) =>
        cache.match(request).then((cached) => {
          if (cached) return cached;
          return fetch(request).then((networkResponse) => {
            try { cache.put(request, networkResponse.clone()); } catch (e) { /* ignore cache put failures */ }
            return networkResponse;
          }).catch(() => cached || Promise.reject('no-match'));
        })
      )
    );
    return;
  }

  // Default: try network, fallback to cache
  event.respondWith(
    fetch(request).catch(() => caches.match(request))
  );
});
