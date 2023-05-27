import { Inter } from "@next/font/google";
import { useRouter } from "next/router";
import { FirebaseAuth } from "react-firebaseui";
import { GUTENLY_BASE } from "@/app/constants/Navigation";
import {
  isSignInWithEmailLink,
  onAuthStateChanged,
  signInWithEmailLink,
} from "firebase/auth";
import * as React from "react";
import styles from "../auth.module.css";
import { useAuth } from "@/components/firebase/FirebaseProvider";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { UserRegister } from "@/components/page_components/UserRegister";
import { ImageCropper } from "@/components/ImageCropper";
import { Persona } from "@/components/Persona";
import { PersonaEditor } from "@/components/PersonaEditor";

const inter = Inter({ subsets: ["latin"] });

const forceRegister = true;

export default function VerifySignInPage() {
  const [isFirstTimeUser, setIsFirstTimeUser] = React.useState(false);
  const [isUserVerified, setIsUserVerified] = React.useState(false);
  const router = useRouter();
  const auth = useAuth();
  const emailAddress = router.query.emailAddress;
  const { displayName, email } = useCurrentUser();

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

  React.useEffect(() => {
    if (isUserVerified && email && !displayName) {
      setIsFirstTimeUser(true);
    }
  }, [isUserVerified, email, displayName]);

  if (email && displayName) {
    window.location.replace(`${GUTENLY_BASE}/`);
  }

  return (
    <>
      <main className={styles.main}>
        {!isUserVerified && !forceRegister ? (
          <h1>There is something wrong with your link</h1>
        ) : (
          <>
            <Persona size={200} name={"Esteban Martinez"} imageLink={""} />
            <PersonaEditor size={400} />
            <UserRegister />
          </>
        )}
      </main>
      <div className={styles.footer}>Made with ♥ in CDMX.</div>
    </>
  );
}
