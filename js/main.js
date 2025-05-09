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
