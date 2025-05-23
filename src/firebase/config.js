// Import only what you need from Firebase modular SDK
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCzKPSZA9o1LyEQtvYc3MV2q5eBmV748",
  authDomain: "barbershop-scheduler-1cbed.firebaseapp.com",
  projectId: "barbershop-scheduler-1cbed",
  storageBucket: "barbershop-scheduler-1cbed.firebasestorage.app",
  messagingSenderId: "956308749808",
  appId: "1:956308749808:web:bb8e397d2fa3e5e033135",
  measurementId: "G-P7TGTS2375"
};

// Initialize Firebase app instance
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);

// If you need the app instance elsewhere
export default app;
