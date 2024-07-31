// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "vc-meetings.firebaseapp.com",
  projectId: "vc-meetings",
  storageBucket: "vc-meetings.appspot.com",
  messagingSenderId: "103269356039",
  appId: "1:103269356039:web:d080e85acd13fc6ca990a2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
