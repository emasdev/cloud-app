import firebase from './FirebaseConfig';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';

const auth = getAuth(firebase);

const doCreateUserWithEmailAndPassword = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

const doSignInWithEmailAndPassword = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

const doSignOut = () => {
  return signOut(auth);
};

const subscribeToAuthChanges = handleAuthChange => {
  onAuthStateChanged(auth, user => {
    handleAuthChange(user);
  });
};

const FirebaseAuthService = {
  doCreateUserWithEmailAndPassword,
  doSignInWithEmailAndPassword,
  doSignOut,
  subscribeToAuthChanges,
};

export default FirebaseAuthService;
