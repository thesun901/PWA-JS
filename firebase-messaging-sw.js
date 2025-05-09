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
  messagingSenderId: "120115123536",
  appId: "1:120115123536:web:dc1ca1fdf2f807755c8855",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log("Powiadomienie w tle:", payload);
  self.registration.showNotification(payload.notification.title, {
    body: payload.notification.body,
    icon: "images/manifest-icon-192.maskable.png",
  });
});
