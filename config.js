// ╔══════════════════════════════════════════════════════╗
// ║  ΒΑΛΕ ΕΔΩ ΤΑ ΣΤΟΙΧΕΙΑ ΑΠΟ ΤΟ FIREBASE CONSOLE       ║
// ║  Project Settings → Your apps → Web app → Config     ║
// ╚══════════════════════════════════════════════════════╝
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyACxHcH_-kiIfxEtm_L5u2Gd3MhJJsTp7o",
  authDomain: "cultureboteval.firebaseapp.com",
  databaseURL: "https://cultureboteval-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "cultureboteval",
  storageBucket: "cultureboteval.firebasestorage.app",
  messagingSenderId: "463119543508",
  appId: "1:463119543508:web:581f7336399af2d7de1f41"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
