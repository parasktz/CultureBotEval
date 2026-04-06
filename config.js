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
  apiKey:            "PLACEHOLDER",
  authDomain:        "PLACEHOLDER",
  databaseURL:       "PLACEHOLDER",
  projectId:         "PLACEHOLDER",
  storageBucket:     "PLACEHOLDER",
  messagingSenderId: "PLACEHOLDER",
  appId:             "PLACEHOLDER"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
