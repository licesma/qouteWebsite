
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore , connectFirestoreEmulator } from "@firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyCNnAYHxzk52Ys1zclDFu6OcOVK10nsf2E",
  authDomain: "qoute-d47c1.firebaseapp.com",
  projectId: "qoute-d47c1",
  storageBucket: "qoute-d47c1.appspot.com",
  messagingSenderId: "771079942885",
  appId: "1:771079942885:web:20360ca4deba21f22e1a0c",
  measurementId: "G-QC7RZB4LFD"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);


export const firestore = getFirestore(app);
connectFirestoreEmulator(firestore, 'localhost', 8080);