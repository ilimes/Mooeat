// importScripts("https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js");
// importScripts(
//   "https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js"
// );

// const firebaseConfig = {
//   apiKey: "xxxxxxxxxx",
//   authDomain: "xxxxxxxxxx.firebaseapp.com",
//   databaseURL: "https://xxxxxxxxxx.firebaseio.com",
//   projectId: "xxxxxxxxxx",
//   storageBucket: "xxxxxxxxxx.appspot.com",
//   messagingSenderId: "xxxxxxxxxx",
//   appId: "xxxxxxxxxx"
// };

// firebase.initializeApp(firebaseConfig);
// const messaging = firebase.messaging();

// messaging.onBackgroundMessage((payload) => {
//   const title = payload.notification.title + " (onBackgroundMessage)";
//   const notificationOptions = {
//     body: payload.notification.body,
//     icon: "https://avatars.githubusercontent.com/sasha1107",
//   };

//   self.registration.showNotification(title, notificationOptions);
// });

//프로젝트 버전 확인
importScripts("https://www.gstatic.com/firebasejs/9.5.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/9.5.0/firebase-messaging.js");

const config = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
firebase.initializeApp(config);

const messaging = firebase.messaging();

//백그라운드 서비스워커 설정
messaging.onBackgroundMessage(messaging, (payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  
  // Customize notification here
  const notificationTitle = "Background Message Title";
  const notificationOptions = {
    body: payload,
    icon: "/firebase-logo.png",
  };
  
  self.registration.showNotification(notificationTitle, notificationOptions);
});