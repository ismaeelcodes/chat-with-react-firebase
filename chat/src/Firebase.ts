// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore'
import { getStorage } from "firebase/storage";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDOew3rh1mSfZvMnmuPfsCT3La6-n1jSCY",
  authDomain: "chat-app-9da6c.firebaseapp.com",
  projectId: "chat-app-9da6c",
  storageBucket: "chat-app-9da6c.appspot.com",
  messagingSenderId: "47025727826",
  appId: "1:47025727826:web:0c37559f28f69452c2b28b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getFirestore(app)
export const storage = getStorage(app)