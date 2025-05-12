import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAeYTvVpNDugkW1Pfz4xKueGkFRThtAEIQ",
  authDomain: "haritahive.firebaseapp.com",
  projectId: "haritahive",
  storageBucket: "haritahive.firebasestorage.app",
  messagingSenderId: "365988282284",
  appId: "1:365988282284:web:e83555bc068a61ddfa8409",
  measurementId: "G-7FCPW0HYP0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
const auth = getAuth(app);

// Initialize Firestore
const db = getFirestore(app);

// Export auth and db for use in other files
export { auth, db };