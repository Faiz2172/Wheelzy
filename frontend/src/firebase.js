import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBLpTlM_yLNEw_vcKm96F99lwe-38vMaKM",
  authDomain: "carmarketplace-ca7e3.firebaseapp.com",
  projectId: "carmarketplace-ca7e3",
  storageBucket: "carmarketplace-ca7e3.firebasestorage.app",
  messagingSenderId: "447147057999",
  appId: "1:447147057999:web:203a33cca8d82572af1b3a",
  measurementId: "G-JCQ0H595V2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

const storage = getStorage(app);

export { db, storage };