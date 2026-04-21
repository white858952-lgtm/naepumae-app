importScripts('https://www.gstatic.com/firebasejs/10.8.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.8.0/firebase-messaging-compat.js');

firebase.initializeApp({
    apiKey: "AIzaSyAitCQVYKsqytLzT_O9_k0lXT7bAsPhjLY",
    authDomain: "naepumae-center.firebaseapp.com",
    projectId: "naepumae-center",
    storageBucket: "naepumae-center.firebasestorage.app",
    messagingSenderId: "591209155709",
    appId: "1:591209155709:web:348eb8e2aca66a355f7514"
});

const messaging = firebase.messaging();
