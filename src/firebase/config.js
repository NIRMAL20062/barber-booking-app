import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyCzKPSZA9o1LyEQtvYc3MV2q5eBmV748",
    authDomain: "barbershop-scheduler-1cbed.firebaseapp.com",
    projectId: "barbershop-scheduler-1cbed",
    storageBucket: "barbershop-scheduler-1cbed.firebasestorage.app",
    messagingSenderId: "956308749808",
    appId: "1:956308749808:web:bb8e397d2fa3e5e033135",
    measurementId: "G-P7TGTS2375"
  };

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const db = firebase.firestore();
export default firebase;


