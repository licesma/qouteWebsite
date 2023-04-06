import { Inter } from "@next/font/google";
import { FirebaseAuth } from "react-firebaseui";
import { isSignInWithEmailLink } from "firebase/auth";
import * as React from "react";
import styles from "./auth.module.css";
import { useAuth } from "@/components/firebase/FirebaseProvider";

const inter = Inter({ subsets: ["latin"] });

export default function VerifySignInPage() {
  const [isUserVerified, setIsUserVerified] = React.useState(false);
  const auth = useAuth();
  React.useEffect(() => {
    const savedEmail = window.localStorage.getItem("emailForSignIn");
    if (isSignInWithEmailLink(auth, window.location.href)) {
    }
  });
}
