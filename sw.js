// Facet Island service worker: precache everything, serve cache-first so the game runs fully offline.
const CACHE = 'facet-island-202611212041';
const FILES = ["./", "./index.html", "./manifest.webmanifest", "./lib/three.core.js", "./lib/three.module.js", "./fonts/f1.woff2", "./fonts/f2.woff2", "./fonts/f3.woff2", "./fonts/f4.woff2", "./fonts/f5.woff2", "./fonts/f6.woff2", "./fonts/f7.woff2", "./fonts/f8.woff2", "./fonts/f9.woff2", "./fonts/fonts.css", "./icons/icon-144.png", "./icons/icon-192.png", "./icons/icon-256.png", "./icons/icon-384.png", "./icons/icon-48.png", "./icons/icon-512.png", "./icons/icon-72.png", "./icons/icon-96.png", "./icons/maskable-512.png", "./icons/shot-01-ferry.jpg", "./icons/shot-02-fps.jpg", "./icons/shot-03-isle2.jpg", "./icons/shot-04-plane.jpg"];
self.addEventListener('install', (e) => { e.waitUntil(caches.open(CACHE).then((c) => c.addAll(FILES)).then(() => self.skipWaiting())); });
self.addEventListener('activate', (e) => { e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET') return;
  e.respondWith(caches.match(e.request, { ignoreSearch: true }).then((r) => r || fetch(e.request).then((res) => {
    if (res.ok && new URL(e.request.url).origin === location.origin) { const copy = res.clone(); caches.open(CACHE).then((c) => c.put(e.request, copy)); }
    return res;
  }).catch(() => caches.match('./index.html'))));
});
