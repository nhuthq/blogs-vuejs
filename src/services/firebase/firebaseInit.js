import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
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
} from 'firebase/firestore';
import {
  ref,
  getStorage,
  uploadBytes,
  deleteObject,
  getDownloadURL,
} from 'firebase/storage';
import {
  getAuth,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyB8V-tXVKUdynuD1aHl3c_ehpsyXoCqbrE',
  authDomain: 'ventura-blogs-vue.firebaseapp.com',
  projectId: 'ventura-blogs-vue',
  storageBucket: 'ventura-blogs-vue.firebasestorage.app',
  messagingSenderId: '303008489970',
  appId: '1:303008489970:web:56e0118b023f8b53034b6b',
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
  doc,
  setDoc,
  getDoc,
  getDocs,
  deleteDoc,
  updateDoc,
  collection,
  firebaseApp,
  firestoreDB,
  firebaseAuth,
  firebaseStorage,
  firebaseAnalytics,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
};
