'use client';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut as firebaseSignOut,
} from 'firebase/auth';
import { useFirebase } from '@/firebase/provider';
import { createUserDocument } from '@/firebase/firestore/users';

export const useAuth = () => {
  const { auth, user, loading } = useFirebase();

  const signUp = async (email: string, password: string):Promise<void> => {
    if (!auth) throw new Error('Firebase Auth is not initialized');
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    await createUserDocument(userCredential.user);
  };

  const signIn = async (email: string, password: string):Promise<void> => {
    if (!auth) throw new Error('Firebase Auth is not initialized');
    await signInWithEmailAndPassword(auth, email, password);
  };

  const signInWithGoogle = async ():Promise<void> => {
    if (!auth) throw new Error('Firebase Auth is not initialized');
    const provider = new GoogleAuthProvider();
    const userCredential = await signInWithPopup(auth, provider);
    // Check if user is new, then create document
    if (userCredential.user) {
        // A full implementation would check if the user document already exists
        // For this MVP, we create it on every Google sign-in for simplicity
        await createUserDocument(userCredential.user);
    }
  };

  const signOut = async ():Promise<void> => {
    if (!auth) throw new Error('Firebase Auth is not initialized');
    await firebaseSignOut(auth);
  };

  return { user, loading, signUp, signIn, signInWithGoogle, signOut };
};
