import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getFirestore,
  doc,
  query,
  getDoc,
  setDoc,
  getDocs,
  deleteDoc,
  updateDoc,
  collection,
} from "firebase/firestore";
import {
  ref,
  getStorage,
  uploadBytes,
  deleteObject,
  getDownloadURL,
} from "firebase/storage";
import {
  getAuth,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyDQ8LHDlfeRo0JLoZYRv7hiEaJ2taAkufQ",
  authDomain: "fire-blog-vuejs.firebaseapp.com",
  projectId: "fire-blog-vuejs",
  storageBucket: "fire-blog-vuejs.appspot.com",
  messagingSenderId: "164455781445",
  appId: "1:164455781445:web:519327390e31b5e0867f2c",
  measurementId: "G-FB4RRYQWZ7"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Analytics
const firebaseAnalytics = getAnalytics(firebaseApp);

// FireStore
const firestoreDB = getFirestore(firebaseApp);

// FireAuth
const firebaseAuth = getAuth();

// Storage
const firebaseStorage = getStorage(firebaseApp);

export {
    firebaseApp,
    firestoreDB,
    firebaseAuth,
    firebaseStorage,
    firebaseAnalytics,
  };
  