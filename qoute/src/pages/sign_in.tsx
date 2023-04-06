import { Inter } from "@next/font/google";
import { FirebaseAuth } from "react-firebaseui";
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  UserCredential,
  signOut,
  GoogleAuthProvider,
  OAuthProvider,
  updateProfile,
  User,
} from "firebase/auth";
import * as React from "react";
import styles from "./auth.module.css";
import { useAuth } from "@/components/firebase/FirebaseProvider";

const inter = Inter({ subsets: ["latin"] });

export default function SignInPage() {
  const auth = useAuth();
  const googleProvider = new GoogleAuthProvider();
  const appleProvider = new OAuthProvider("apple.com");
  const [user, setUser] = React.useState<User | null>(null);
  const [userDisplayName, setUserDisplayName] = React.useState<string>("");
  const [userEmail, setLoginEmail] = React.useState<string>("");
  const [userPassword, setLoginPassword] = React.useState<string>("");

  const onDisplayNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserDisplayName(event.target.value);
  };

  const onEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLoginEmail(event.target.value);
  };

  const onPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLoginPassword(event.target.value);
  };

  const signInWithGoogle = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        console.log(result);
      })
      .catch((error) => console.log(error));
  };

  const singInWithApple = () => {
    signInWithPopup(auth, appleProvider)
      .then((result) => console.log(result))
      .catch((error) => console.log(error));
  };

  React.useEffect(() => {
    console.log("ok");
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, [auth]);

  const resgister = async () => {};

  const logout = () => {
    signOut(auth);
  };

  const handleSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.target.reset();
  };

  const login = async () => {
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        userEmail,
        userPassword
      );
      console.log("Whaat");

      auth.currentUser &&
        userDisplayName &&
        updateProfile(auth.currentUser, {
          displayName: userDisplayName,
        });
    } catch (error) {
      console.log("error");
    }
  };

  return (
    <>
      <main className={styles.main}>
        <form onSubmit={handleSubmit}>
          <div className={styles.authContent}>
            <div className={styles.signInLabel}>Sign in</div>
            <button className={styles.googleButton} onClick={signInWithGoogle}>
              Continue with Google
            </button>
            <div className={styles.orContainer}>
              <div className={styles.orSeparator} />
              <div>or</div>
              <div className={styles.orSeparator} />
            </div>
            <div>Email</div>
            <input
              className={styles.authInput}
              type={"email"}
              onChange={onEmailChange}
            />
            <div>Password</div>
            <input
              className={styles.authInput}
              type={"password"}
              onChange={onPasswordChange}
            />
            <button className={styles.loginButton} onClick={login}>
              Sign In with Mail
            </button>

            <button className={styles.loginButton} onClick={logout}>
              Logout
            </button>
            <div>{auth.currentUser?.displayName}</div>
          </div>
        </form>
      </main>
      <div className={styles.footer}>Made with ♥ in CDMX.</div>
    </>
  );
}
