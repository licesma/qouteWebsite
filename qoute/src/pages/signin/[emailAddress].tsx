import { Inter } from "@next/font/google";
import { useRouter } from "next/router";
import { FirebaseAuth } from "react-firebaseui";
import { isSignInWithEmailLink, signInWithEmailLink } from "firebase/auth";
import * as React from "react";
import styles from "../auth.module.css";
import { useAuth } from "@/components/firebase/FirebaseProvider";

const inter = Inter({ subsets: ["latin"] });

export default function VerifySignInPage() {
  const [isUserVerified, setIsUserVerified] = React.useState(false);
  const router = useRouter();
  const auth = useAuth();
  const emailAddress = router.query.emailAddress;
  React.useEffect(() => {
    if (
      isSignInWithEmailLink(auth, window.location.href) &&
      typeof emailAddress === "string"
    ) {
      signInWithEmailLink(auth, emailAddress);
      setIsUserVerified(true);
      console.log(auth);
    }
  }, [emailAddress, auth]);
  return (
    <>
      <main className={styles.main}>
        <h1>{isUserVerified ? "You're all set" : "Stop fooling with me"}</h1>
        <h3>{emailAddress}</h3>
      </main>
      <div className={styles.footer}>Made with ♥ in CDMX.</div>
    </>
  );
}
