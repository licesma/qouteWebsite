import { Inter } from "@next/font/google";
import { useRouter } from "next/router";
import { GUTENLY_BASE } from "@/app/constants/Navigation";
import { isSignInWithEmailLink, signInWithEmailLink } from "firebase/auth";
import * as React from "react";
import styles from "../auth.module.css";
import { useAuth } from "@/components/firebase/FirebaseProvider";
import { useProfilePicture } from "@/components/firebase/Hook/ProfilePicture";
import { useCurrentUser } from "@/components/firebase/Hook/Auth";
import { UserRegister } from "@/components/page_components/UserRegister";
import { Persona } from "@/components/Persona";
import { PersonaEditor } from "@/components/PersonaEditor";

const inter = Inter({ subsets: ["latin"] });

const forceRegister = true;

export default function VerifySignInPage() {
  const [isFirstTimeUser, setIsFirstTimeUser] = React.useState(false);
  const [isUserVerified, setIsUserVerified] = React.useState(false);
  const router = useRouter();
  const { auth } = useAuth();
  const profilePicture = useProfilePicture();
  const emailAddress = router.query.emailAddress;
  const { name, email } = useCurrentUser();

  React.useEffect(() => {
    if (
      isSignInWithEmailLink(auth, window.location.href) &&
      typeof emailAddress === "string"
    ) {
      signInWithEmailLink(auth, emailAddress);
      setIsUserVerified(true);
    }
  }, [emailAddress, auth]);

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
            <Persona
              size={200}
              name={"Esteban Martinez"}
              imageLink={profilePicture.profilePicture}
            />
            <PersonaEditor size={400} />
            <UserRegister />
          </>
        )}
      </main>
      <div className={styles.footer}>Made with ♥ in CDMX.</div>
    </>
  );
}
