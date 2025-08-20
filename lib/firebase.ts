// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore/lite";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAFAeqx0BwHsTZYi1VWUZ4SHyyJvubTqIY",
  authDomain: "natural-oath-402108.firebaseapp.com",
  projectId: "natural-oath-402108",
  storageBucket: "natural-oath-402108.firebasestorage.app",
  messagingSenderId: "544257753983",
  appId: "1:544257753983:web:f396e565cdf561a624504a",
  measurementId: "G-GBQ7745S5E"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);