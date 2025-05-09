const cacheName = "piac-pwa-v6";
const filesToCache = ["/", "/index.html", "/style.css"];
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(cacheName).then((cache) => {
      return cache.addAll(filesToCache);
    })
  );
});
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches
      .match(event.request)
      .then((response) => {
        return (
          response ||
          fetch(event.request).then((fetchResponse) => {
            return caches.open(cacheName).then((cache) => {
              cache.put(event.request, fetchResponse.clone());
              return fetchResponse;
            });
          })
        );
      })
      .catch(() => {
        // Fallback dla braku połączenia
        if (event.request.mode === "navigate") {
          return caches.match("/index.html");
        }
      })
  );
});
self.addEventListener("activate", (event) => {
  const cacheWhitelist = [cacheName];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (!cacheWhitelist.includes(cache)) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
  self.clients.claim();
});

importScripts(
  "https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging-compat.js"
);

firebase.initializeApp({
  apiKey: "AIzaSyAWUgzFHiP6Wrsw1ZOfcaXdL0F1fDHxjGU",
  authDomain: "pwa-test-e2b30.firebaseapp.com",
  projectId: "pwa-test-e2b30",
  storageBucket: "pwa-test-e2b30.firebasestorage.app",
  messagingSenderId: "120115123536",
  appId: "1:120115123536:web:dc1ca1fdf2f807755c8855",
  measurementId: "G-7R9TTJ9R95",
});

const messaging = firebase.messaging();

// Obsługa push gdy aplikacja jest zamknięta
messaging.onBackgroundMessage((payload) => {
  console.log("Otrzymano powiadomienie (w tle):", payload);
  self.registration.showNotification(payload.notification.title, {
    body: payload.notification.body,
    icon: "images/manifest-icon-192.maskable.png",
  });
});
