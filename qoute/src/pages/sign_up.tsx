import { Inter } from "@next/font/google";
import { FirebaseAuth } from "react-firebaseui";
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  UserCredential,
  sendEmailVerification,
  updateProfile,
  User,
} from "firebase/auth";
import * as React from "react";
import styles from "./auth.module.css";
import { useAuth } from "@/components/firebase/FirebaseProvider";

const inter = Inter({ subsets: ["latin"] });

export default function AuthPage() {
  const auth = useAuth();
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

  React.useEffect(() => {
    console.log("ok");
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, [auth]);

  const resgister = async () => {};

  const handleSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.target.reset();
  };

  const login = async () => {
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        userEmail,
        userPassword
      );
      console.log("Whaat");
      if (auth.currentUser) {
        userDisplayName &&
          updateProfile(auth.currentUser, {
            displayName: userDisplayName,
          });
        sendEmailVerification(auth.currentUser);
      }
    } catch (error) {
      console.log("error");
    }
  };

  const logout = async () => {};
  return (
    <>
      <main className={styles.main}>
        <form onSubmit={handleSubmit}>
          <div className={styles.authContent}>
            <div className={styles.signInLabel}>Sign in</div>
            <div>Name</div>
            <input
              className={styles.authInput}
              type={"text"}
              onChange={onDisplayNameChange}
            />
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
              Sign Up
            </button>
            <div>{auth.currentUser?.displayName}</div>
          </div>
        </form>
      </main>
      <div className={styles.footer}>Made with ♥ in CDMX.</div>
    </>
  );
}
