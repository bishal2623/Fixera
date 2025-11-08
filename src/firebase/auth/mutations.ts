'use client';

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  User,
} from 'firebase/auth';
import {
  getFirestore,
  doc,
  setDoc,
  serverTimestamp,
} from 'firebase/firestore';

const auth = getAuth();
const firestore = getFirestore();

// Function to create a user profile document in Firestore
const createUserProfile = async (user: User) => {
  const userRef = doc(firestore, 'users', user.uid);
  const userProfile = {
    uid: user.uid,
    email: user.email,
    displayName: user.displayName,
    photoURL: user.photoURL,
    createdAt: serverTimestamp(),
  };
  await setDoc(userRef, userProfile, { merge: true });
};

// Sign up with email and password
export const signUpWithEmail = async (email: string, password: string) => {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
  await createUserProfile(userCredential.user);
  return userCredential;
};

// Sign in with email and password
export const signInWithEmail = async (email: string, password: string) => {
  return await signInWithEmailAndPassword(auth, email, password);
};

// Sign in with Google
export const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  const userCredential = await signInWithPopup(auth, provider);
  // Check if it's a new user
  if (userCredential.user.metadata.creationTime === userCredential.user.metadata.lastSignInTime) {
      await createUserProfile(userCredential.user);
  }
  return userCredential;
};
