import React, { useState, useEffect, useContext, createContext } from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
import Loading from "../components/views/Loading";

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  appId: process.env.REACT_APP_MESSAGING_APP_ID,
};

initializeApp(config);
const AuthContext = createContext();

// Hook for child components to get the auth object ...
// ... and re-render when it changes.
export const useAuth = () => {
  return useContext(AuthContext);
};

// Provider hook that creates auth object and handles state
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const auth = getAuth();
  const db = getFirestore();

  useEffect(() => {
    console.log("useAuth effect");
    onAuthStateChanged(auth, (user) => {

      if (user) {
        console.log("user is in");
        if (!userData) {
          const docRef = doc(db, "usuarios", user.uid);
          getDoc(docRef).then((docSnap) => {
            if (docSnap.exists()) {
              setUserData(docSnap.data());
              setUser(user);
              setIsAuthenticating(false);
            }
          });
        }
      } else {
        setIsAuthenticating(false);
        setUserData(null);
        setUser(null);
        console.log("no user in");
      }
    });
  }, [auth, db, userData]);

  // useEffect(() => {

  // })

  // useEffect(() => {
  //   if (user && !userData) {
  //     getCurrentUserDoc().then((data) => {
  //       console.log(userData);
  //     });
  //   }
  // }, [user, userData]);

  const doSignInWithEmailAndPassword = async (email, password) => {
    let userCredentials = null;
    try {
      userCredentials = await signInWithEmailAndPassword(auth, email, password);
      //setUser(user);
    } catch (e) {
      console.error(e.message);
    }

    return userCredentials.user;
  };

  const doCreateUserDoc = async (user, data) => {
    let isCreated = false;
    try {
      await setDoc(doc(db, "usuarios", user.uid), data);
      setUserData(doc);
      isCreated = true;
    } catch (e) {
      console.error("Error adding document: ", e);
    }

    return isCreated;
  };

  // const getCurrentUserDoc = async () => {
  //   const docRef = doc(db, "usuarios", user.uid);
  //   const docSnap = await getDoc(docRef);

  //   if (docSnap.exists()) {
  //     const data = docSnap.data();
  //     return data;
  //   } else {
  //     // doc.data() will be undefined in this case
  //     console.log("No such document!");
  //   }
  // };

  const doSignOut = async () => {
    let isSignedOut = false;
    try {
      await signOut(auth);
      isSignedOut = true;
    } catch (e) {
      console.error(e.message);
    }

    return isSignedOut;
  };

  const doCreateUserWithEmailAndPassword = async (email, password) => {
    let userCredentials = null;
    try {
      userCredentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
    } catch (e) {
      console.error(e);
    }

    return userCredentials.user;
  };

  // The user object and auth methods
  const values = {
    user,
    userData,
    isAuthenticating,
    doSignInWithEmailAndPassword,
    doCreateUserWithEmailAndPassword,
    doCreateUserDoc,
    doSignOut,
  };



  if (isAuthenticating) {
    return <Loading />;
  } else {
    return (
      <AuthContext.Provider value={values}>
        {!isAuthenticating && children}
      </AuthContext.Provider>
    );
  }
};
