// src/firebase.js
// firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

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

// Get services from Firebase
const auth = getAuth(app);
const db = getFirestore(app);

// Sign Up function
const signUp = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Sign In function
const signIn = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Logout function
const logout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    throw new Error(error.message);
  }
};

export { auth, db, signUp, signIn, logout };
