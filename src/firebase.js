// Import Firebase
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your Firebase config (replace with yours)
const firebaseConfig = {
    apiKey: "AIzaSyASgPMHig7RdRDd8eHkv2r3egLGtYfRVbo",
    authDomain: "xecurevault.firebaseapp.com",
    projectId: "xecurevault",
    storageBucket: "xecurevault.firebasestorage.app",
    messagingSenderId: "1063671501759",
    appId: "1:1063671501759:web:6845e5f3e6375f6b3c070a",
    measurementId: "G-PN7VXGSSTZ"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
