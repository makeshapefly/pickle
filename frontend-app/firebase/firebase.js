import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
    apiKey: "AIzaSyC2BVemSgqB7GO2Wg0zYWIjYDkpMoBoAbI",
    authDomain: "pickle-326f7.firebaseapp.com",
    projectId: "pickle-326f7",
    storageBucket: "pickle-326f7.firebasestorage.app",
    messagingSenderId: "450599223985",
    appId: "1:450599223985:web:a32731a76a82fa32c89890"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);