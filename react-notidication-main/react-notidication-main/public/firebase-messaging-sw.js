importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js"
);

const firebaseConfig = {
  apiKey: "AIzaSyCMeNKmhuV8ui1RiDSZHLaIdG6CEAya6h4",
  authDomain: "notification-d2cce.firebaseapp.com",
  projectId: "notification-d2cce",
  storageBucket: "notification-d2cce.appspot.com",
  messagingSenderId: "844241950121",
  appId: "1:844241950121:web:18167d388828613e4620b8",
  // measurementId: "G-9DMSP9FJY0"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.image,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
