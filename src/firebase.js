// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth,GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBKa3UUxnNxGa1EJVwmBnzGIDp6Lp9DoEI",
  authDomain: "mentalhealthsupport-1b588.firebaseapp.com",
  projectId: "mentalhealthsupport-1b588",
  storageBucket: "mentalhealthsupport-1b588.firebasestorage.app",
  messagingSenderId: "614498728009",
  appId: "1:614498728009:web:4e4776cc088c274541a798",
  measurementId: "G-ML0HHXFFZL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and Firestore
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();

export default app;