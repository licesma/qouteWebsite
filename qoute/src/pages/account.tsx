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
import styles from "./auth.module.css";
import { useFetchProfilePicture } from "@/components/firebase/Hook/ProfilePicture";
import { useCurrentUser } from "@/components/firebase/Hook/Auth";
import { AccountEditor } from "@/components/page_components/AccountEditor";
import { PersonaEditor } from "@/components/PersonaEditor";

const inter = Inter({ subsets: ["latin"] });

const forceRegister = true;

export default function VerifySignInPage() {
  const [isFirstTimeUser, setIsFirstTimeUser] = React.useState(false);
  const [isUserVerified, setIsUserVerified] = React.useState(false);
  const { data: profilePicture } = useFetchProfilePicture();
  const { name, email } = useCurrentUser();

  React.useEffect(() => console.log(profilePicture));

  React.useEffect(() => {
    if (isUserVerified && email && !name) {
      setIsFirstTimeUser(true);
    }
  }, [isUserVerified, email, name]);

  if (email && name) {
    window.location.replace(`${GUTENLY_BASE}/`);
  }

  return (
    <>
      <main className={styles.main}>
        {!isUserVerified && !forceRegister ? (
          <h1>There is something wrong with your link</h1>
        ) : (
          <>
            <PersonaEditor
              size={400}
              name={"Esteban Martínez"}
              imageLink={profilePicture}
            />
            <AccountEditor />
          </>
        )}
      </main>
    </>
  );
}
