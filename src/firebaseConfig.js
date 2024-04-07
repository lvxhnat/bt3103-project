// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
// https://firebase.google.com/docs/web/setup#available-libraries

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDpNZm22tx-PIQmS41VfCA9G8cSiueMdtw",
  authDomain: "secondservings-c271d.firebaseapp.com",
  projectId: "secondservings-c271d",
  storageBucket: "secondservings-c271d.appspot.com",
  messagingSenderId: "808653863989",
  appId: "1:808653863989:web:ec8d471aa972100d2bc57c"
};

const provider = new GoogleAuthProvider();
export const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);
export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
export default firebaseConfig
