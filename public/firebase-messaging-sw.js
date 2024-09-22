importScripts("https://www.gstatic.com/firebasejs/9.6.10/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/9.6.10/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyAFvqdevKUT93A_IwP7g7Q-KvSiEOnQfWw",
  authDomain: "mooeat-98f72.firebaseapp.com",
  projectId: "mooeat-98f72",
  messagingSenderId: "617860525828",
  appId: "1:617860525828:web:b27c059a24e539a823aa51",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  console.log("[firebase-messaging-sw.js] Received background message ", payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: "/firebase-logo.png",
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});