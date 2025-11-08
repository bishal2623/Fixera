import {
  doc,
  setDoc,
  serverTimestamp,
  getFirestore,
} from 'firebase/firestore';
import type { User } from 'firebase/auth';

export const createUserDocument = async (user: User) => {
  const db = getFirestore();
  const userDocRef = doc(db, 'users', user.uid);

  const userData = {
    uid: user.uid,
    email: user.email,
    displayName: user.displayName,
    photoURL: user.photoURL,
    createdAt: serverTimestamp(),
  };

  await setDoc(userDocRef, userData, { merge: true });
};
