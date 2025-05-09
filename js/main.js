window.onload = () => {
  "use strict";
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker
      .register("./sw.js")

      .then(() => console.log("Service Worker registered successfully."))
      .catch((error) =>
        console.error("Service Worker registration failed:", error)
      );
  }

  testNotification();

  const modal = document.getElementById("image-modal");
  const modalImg = document.getElementById("modal-img");
  const modalClose = document.getElementById("modal-close");

  document.querySelectorAll("img").forEach((img) => {
    img.addEventListener("click", () => {
      modal.style.display = "block";
      modalImg.src = img.src;
      modalImg.alt = img.alt;
    });
  });

  modalClose.onclick = () => {
    modal.style.display = "none";
  };

  modal.onclick = (e) => {
    if (e.target === modal) modal.style.display = "none";
  };

  if ("Notification" in window && "serviceWorker" in navigator) {
    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        console.log("Powiadomienia włączone!");
      } else {
        console.log("Brak zgody na powiadomienia.");
      }
    });
  }
};

function testNotification() {
  if (Notification.permission === "granted") {
    navigator.serviceWorker.getRegistration().then((reg) => {
      reg.showNotification("Elek Żelek mówi hej 👋", {
        body: "To jest testowe powiadomienie z PWA!",
        icon: "images/manifest-icon-192.maskable.png",
        badge: "images/manifest-icon-192.maskable.png",
      });
    });
  }
}

const firebaseConfig = {
  apiKey: "AIzaSyAWUgzFHiP6Wrsw1ZOfcaXdL0F1fDHxjGU",
  authDomain: "pwa-test-e2b30.firebaseapp.com",
  projectId: "pwa-test-e2b30",
  storageBucket: "pwa-test-e2b30.firebasestorage.app",
  messagingSenderId: "120115123536",
  appId: "1:120115123536:web:dc1ca1fdf2f807755c8855",
  measurementId: "G-7R9TTJ9R95",
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging
  .getToken({
    vapidKey:
      "BFG3Z9yml-raBL_j5QuHquSoDLfyrPKqOA5OMoDLBKsnBCx_hJGVIDIaR7nuhkBcEG74YhJjZOZV_qGkuM7GsoI",
  })
  .then((currentToken) => {
    if (currentToken) {
      console.log("Token urządzenia:", currentToken);
    } else {
      console.warn("Brak tokena. Poproś o zgodę.");
    }
  })
  .catch((err) => {
    console.error("Błąd przy pobieraniu tokena:", err);
  });
