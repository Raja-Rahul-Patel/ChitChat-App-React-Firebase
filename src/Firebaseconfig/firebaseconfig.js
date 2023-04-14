// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
import {getStorage} from "firebase/storage"; 


const firebaseConfig = {
  apiKey: "AIzaSyD3KZ4VHCHqdJSn8jwjJk8DccmjiQUkYnk",
  authDomain: "my-chat-app-9b373.firebaseapp.com",
  projectId: "my-chat-app-9b373",
  storageBucket: "my-chat-app-9b373.appspot.com",
  messagingSenderId: "322622830878",
  appId: "1:322622830878:web:9b36c17634a997dacc710f",
  measurementId: "G-K05MFP7F1D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app)
export const storage = getStorage(app)
export const db = getFirestore(app)