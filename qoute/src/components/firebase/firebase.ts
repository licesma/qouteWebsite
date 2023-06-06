import { getAuth } from "@firebase/auth";
import { connectFirestoreEmulator, getFirestore } from "@firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import { FirebaseApp, initializeApp } from "firebase/app";
import type { Auth } from "firebase/auth";
import { FirebaseStorage, getStorage } from "firebase/storage";
import type { Firestore } from "firebase/firestore";
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
  measurementId: "G-QC7RZB4LFD",
};
declare global {
  interface Window {
    _init: boolean;
  }
}

export class Firebase {
  private app: FirebaseApp;
  private firestore: Firestore;
  private storage: FirebaseStorage;
  private auth: Auth;
  constructor() {
    this.app = initializeApp(firebaseConfig);
    this.firestore = getFirestore(this.app);
    this.storage = getStorage(this.app);
    this.auth = getAuth(this.app);
    if (typeof window === "undefined" || !window._init) {
      //necessary for not initializing emulator twice
      connectFirestoreEmulator(this.firestore, "localhost", 8080);
      if (typeof window !== "undefined") {
        window._init = true;
      }
    }
  }

  public getFirestore(): Firestore {
    return this.firestore;
  }

  public getAuth(): Auth {
    return this.auth;
  }

  public getStorage(): FirebaseStorage {
    return this.storage;
  }
}
