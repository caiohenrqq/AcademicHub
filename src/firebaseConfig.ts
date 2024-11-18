// src/firebaseConfig.ts
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDMJeH3crLFSDkgpCzJxZ_17CL49yMneI0",
  authDomain: "academic-hub-5ccdb.firebaseapp.com",
  projectId: "academic-hub-5ccdb",
  storageBucket: "academic-hub-5ccdb.appspot.com",
  messagingSenderId: "7588056884",
  appId: "1:7588056884:web:bc687b9cdfd816d5655f61"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth and Firestore
export const auth = getAuth(app);
export const firestore = getFirestore(app);

// Google Auth Provider
const provider = new GoogleAuthProvider();

// Function to handle Google Sign-In
export const signInWithGoogle = async () => {
  try {
    await signInWithPopup(auth, provider);
    console.log('User signed in with Google');
  } catch (error) {
    console.error('Error signing in with Google:', error);
    throw error; // Re-throw to handle in the component if needed
  }
};
