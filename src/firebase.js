import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "haritahive-d2566.firebaseapp.com",
  projectId: "haritahive-d2566",
  storageBucket: "haritahive-d2566.firebasestorage.app",
  messagingSenderId: "733504525231",
  appId: "1:733504525231:web:02966c184374ab4e16d55a",
  measurementId: "G-PBNM02R3GR"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };