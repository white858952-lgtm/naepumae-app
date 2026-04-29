importScripts('https://www.gstatic.com/firebasejs/10.8.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.8.0/firebase-messaging-compat.js');

firebase.initializeApp({
    apiKey: "AIzaSyAitCQVYKsqytLzT_O9_k0lXT7bAsPhjLY",
    authDomain: "naepumae-center.firebaseapp.com",
    databaseURL: "https://naepumae-center-default-rtdb.firebaseio.com", // 🌟 이것도 명시해 주는 것이 안전합니다
    projectId: "naepumae-center",
    storageBucket: "naepumae-center.firebasestorage.app",
    messagingSenderId: "591209155709",
    appId: "1:591209155709:web:348eb8e2aca66a355f7514"
});

const messaging = firebase.messaging();

// 🌟 [핵심 추가됨] 앱이 백그라운드에 있거나 꺼져 있을 때 알림을 띄워주는 로직
messaging.onBackgroundMessage(function(payload) {
    console.log('[firebase-messaging-sw.js] 백그라운드 알림 수신:', payload);
    
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: 'https://i.postimg.cc/GhCRBzng/icon.png?v=2' // 내품애 센터 로고
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
});
