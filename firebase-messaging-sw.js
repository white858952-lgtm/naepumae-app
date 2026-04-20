// firebase-messaging-sw.js
importScripts('https://www.gstatic.com/firebasejs/10.8.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.8.0/firebase-messaging-compat.js');

const firebaseConfig = {
    apiKey: "AIzaSyAitCQVYKsqytLzT_O9_k0lXT7bAsPhjLY",
    authDomain: "naepumae-center.firebaseapp.com",
    projectId: "naepumae-center",
    storageBucket: "naepumae-center.firebasestorage.app",
    messagingSenderId: "591209155709",
    appId: "1:591209155709:web:348eb8e2aca66a355f7514"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

// 백그라운드 메시지 수신 처리
messaging.onBackgroundMessage((payload) => {
    console.log('[sw.js] 백그라운드 메시지 수신:', payload);
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: 'https://i.postimg.cc/GhCRBzng/icon.png'
    };
    self.registration.showNotification(notificationTitle, notificationOptions);
});
