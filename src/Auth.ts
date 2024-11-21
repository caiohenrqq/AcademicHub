// // src/Auth.ts
// import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
// import { auth } from './firebaseConfig';

// // Google Auth Provider
// const googleProvider = new GoogleAuthProvider();

// // Function to sign in with Google
// export const signInWithGoogle = async () => {
//   try {
//     await signInWithPopup(auth, googleProvider);
//   } catch (error) {
//     console.error('Error signing in with Google:', error);
//   }
// };