import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/database";

const config = {
  apiKey: "AIzaSyDDmxPISlYYFouXAco-fD1GwAPh0M-f7xM",
  authDomain: "crwn-db-cc44f.firebaseapp.com",
  databaseURL: "https://crwn-db-cc44f.firebaseio.com",
  projectId: "crwn-db-cc44f",
  storageBucket: "crwn-db-cc44f.appspot.com",
  messagingSenderId: "847322776886",
  appId: "1:847322776886:web:04784fa02b5320bb049f97",
  measurementId: "G-96HEB9LLVQ",
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }
  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
