import { FirebaseApp } from "firebase/app";
import { Auth } from "firebase/auth";
import { Firestore } from "firebase/firestore";
import * as React from "react";
import { Firebase } from "./firebase";

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
  React.useEffect(() => {
    console.log("Esteban");
  }, []);

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

export const useFirestore = (): Firestore => {
  const firebase = useFirebase();
  return firebase.getFirestore();
};

export const useAuth = (): Auth => {
  const firebase = useFirebase();
  return firebase.getAuth();
};
