
const CACHE="sadebooks-v1";const ASSETS=["index.html","books.html","book.html","login.html","register.html","malipo.html","my-books.html","wishlist.html","profile.html","assets/css/style.css","assets/js/app.js","data/books.json","manifest.webmanifest"];
self.addEventListener("install",e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting())));
self.addEventListener("activate",e=>e.waitUntil(self.clients.claim()));
self.addEventListener("fetch",e=>e.respondWith(caches.match(e.request).then(x=>x||fetch(e.request).then(r=>{let copy=r.clone();caches.open(CACHE).then(c=>c.put(e.request,copy));return r}).catch(()=>caches.match("index.html")))));
