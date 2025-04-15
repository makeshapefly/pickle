import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
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

export const auth = getAuth(app);

export const db = getFirestore(app);