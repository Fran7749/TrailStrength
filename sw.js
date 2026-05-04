// This service worker caches static assets for offline functionality.

const CACHE_NAME = "trailstrength-v1";

// IMPORTANT: GitHub Pages base path
const BASE_PATH = "/TrailStrength/";

const urlsToCache = [
  BASE_PATH,
  BASE_PATH + "index.html",
  BASE_PATH + "manifest.json"
  // Add your files below if they exist:
  // BASE_PATH + "styles.css",
  // BASE_PATH + "app.js",
  // BASE_PATH + "icons/icon-192.png",
  // BASE_PATH + "icons/icon-512.png"
];

// INSTALL EVENT
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
  self.skipWaiting();
});

// ACTIVATE EVENT
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      );
    })
  );
  self.clients.claim();
});

// FETCH EVENT (offline support)
self.addEventListener("fetch", event => {
  event.respondWith(
    fetch(event.request).catch(() => {
      return caches.match(event.request);
    })
  );
});
