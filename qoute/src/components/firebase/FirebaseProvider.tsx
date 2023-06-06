import { FirebaseApp } from "firebase/app";
import { Auth } from "firebase/auth";
import { Firestore } from "firebase/firestore";
import { getAuth, updateProfile } from "firebase/auth";
import type { FirebaseStorage } from "firebase/storage";
import * as React from "react";
import { Firebase } from "./firebase";
import { createFalse } from "typescript";

export const FirebaseContext = React.createContext<Firebase | undefined>(
  undefined
);

export interface FirebaseProviderProps {
  children: JSX.Element;
}

export const FirebaseProvider: React.FunctionComponent<
  FirebaseProviderProps
> = (props) => {
  const [firebaseApp, setFirebaseApp] = React.useState<Firebase | undefined>(
    new Firebase()
  );

  return (
    <FirebaseContext.Provider value={firebaseApp}>
      {props.children}
    </FirebaseContext.Provider>
  );
};

export const useFirebase = (): Firebase => {
  const firebaseContext = React.useContext(FirebaseContext);
  if (firebaseContext === undefined) {
    throw new Error(
      "useFirebase must be used inside a FirebaseContext provider"
    );
  }
  return firebaseContext;
};

export const useStorage = (): FirebaseStorage => {
  return useFirebase().getStorage();
};

export const useFirestore = (): Firestore => {
  const firebase = useFirebase();
  return firebase.getFirestore();
};

export interface UseAuthProps {
  auth: Auth;
  updateUserName: (name: string) => void;
}

export const useAuth = (): UseAuthProps => {
  const firebase = useFirebase();
  const auth = firebase.getAuth();
  const updateUserName = React.useCallback(
    (userName: string) => {
      if (auth.currentUser) {
        updateProfile(auth.currentUser, {
          displayName: userName,
        })
          .then(() => {
            alert("User name updated successfully.");
          })
          .catch((error) => {
            console.error("Fail to update user name.");
          });
      }
    },
    [auth]
  );
  return { auth, updateUserName };
};
