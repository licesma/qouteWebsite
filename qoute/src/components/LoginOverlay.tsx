import { Josefin_Sans, Roboto, Roboto_Serif } from "@next/font/google";
import Image from "next/image";
import * as React from "react";
import { sendSignInLinkToEmail } from "firebase/auth";
import styles from "./LoginOverlay.module.css";
import { useAuth } from "@/components/firebase/FirebaseProvider";
import { Overlay } from "./Overlay";

const josefin = Josefin_Sans({ subsets: ["latin"], weight: "600" });
const roboto = Roboto_Serif({ subsets: ["latin"], weight: ["400"] });

export interface LoginOverlayProps {
  onDismiss: () => void;
}

export const LoginOverlay: React.FunctionComponent<LoginOverlayProps> = (
  props
) => {
  const { onDismiss } = props;
  const [continueWithMail, setContinueWithMail] = React.useState(false);
  const [isValidEmail, setIsValidEmail] = React.useState(false);
  const [emailSent, setEmailSent] = React.useState(false);
  const [inputEmail, setInputEmail] = React.useState<string>("");
  const emailInputRef = React.useRef<HTMLInputElement>(null);
  const auth = useAuth();

  const handleSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.target.reset();
  };

  React.useEffect(() => {
    console.log(auth);
  });

  const onInputEmailChange = (e: React.FormEvent<HTMLInputElement>) => {
    const email = e.currentTarget.value;
    setInputEmail(email);
    const atSignIndex = email.indexOf("@");
    const dotIndex = email.indexOf(".");
    console.log("atSing: ", atSignIndex);
    console.log("dot: ", dotIndex);
    if (
      atSignIndex !== -1 &&
      dotIndex !== -1 &&
      atSignIndex < dotIndex &&
      dotIndex !== email.length - 1
    ) {
      setIsValidEmail(true);
      setInputEmail(email);
    } else {
      setIsValidEmail(false);
    }
  };

  const onSendLinkEmail = () => {
    const actionCodeSettings = {
      url: `http://localhost:3000/signin/${inputEmail}`,
      handleCodeInApp: true,
    };

    try {
      sendSignInLinkToEmail(auth, inputEmail, actionCodeSettings);
      setEmailSent(true);
    } catch (err) {
      console.log(err);
    }
  };

  const onBackToLinkMailMenu = () => {
    setEmailSent(false);
    setInputEmail("");
    setContinueWithMail(false);
    setIsValidEmail(false);
  };

  React.useEffect(() => {
    console.log(continueWithMail);
  });
  return (
    <Overlay onDismiss={onDismiss}>
      <div
        className={styles.authContent}
        style={{
          transition: "max-height 1s ease-in-out",
          maxHeight: continueWithMail ? undefined : "200px",
        }}
      >
        <div className={`${styles.signInLabel} ${roboto.className}`}>
          {"Let's get started!"}
        </div>
        <button className={styles.googleButton} onClick={() => {}}>
          Continue with Google
        </button>
        <div className={styles.orContainer}>
          <div className={styles.orSeparator} />
          <div>or</div>
          <div className={styles.orSeparator} />
        </div>
        <form onSubmit={handleSubmit}>
          <div
            className={styles.continueWithMailMenu}
            style={{ display: emailSent ? "none" : undefined }}
          >
            <button
              className={styles.loginButton}
              type={"button"}
              onClick={() => {
                setContinueWithMail(true);
                emailInputRef?.current?.focus();
              }}
              style={{
                zIndex: "2",
              }}
            >
              Continue with Mail
            </button>
            <input
              className={styles.authInput}
              ref={emailInputRef}
              autoFocus
              type={"email"}
              placeholder={"email"}
              onChange={onInputEmailChange}
              style={{
                visibility: continueWithMail ? undefined : "hidden",
                transform: continueWithMail ? undefined : "translateY(-50px)",
                border: isValidEmail ? "1px solid  rgb(3, 152, 97)" : undefined,
                zIndex: "1",
              }}
            />
            <button
              className={styles.sendLinkButton}
              onClick={onSendLinkEmail}
              style={{
                display: continueWithMail ? undefined : "hidden",
                transform: continueWithMail ? undefined : "translateY(-120px)",
                color: isValidEmail ? " rgb(3, 152, 97)" : undefined,
                cursor: isValidEmail ? "pointer" : "not-allowed",
                zIndex: "1",
              }}
              disabled={!isValidEmail}
            >
              Send email link
            </button>
          </div>
        </form>
        <div
          className={styles.sentEmailMenu}
          style={{ display: emailSent ? undefined : "none" }}
        >
          <div className={`${styles.successEmailSent} ${roboto.className}`}>
            Success!
          </div>
          <div className={roboto.className}>
            A verification email was successfully sent to: <b>{inputEmail}</b>
          </div>
          <Image
            className={styles.emailSentPicture}
            alt={"ok"}
            width={80}
            height={80}
            src={"./email_verification.svg"}
          />
          <div className={roboto.className}>Please check your inbox. </div>
          <button
            className={styles.sendLinkButton}
            onClick={onBackToLinkMailMenu}
            style={{
              display: continueWithMail ? undefined : "hidden",
              transform: continueWithMail ? undefined : "translateY(-120px)",
              cursor: isValidEmail ? "pointer" : "not-allowed",
              zIndex: "1",
            }}
          >
            Use another email
          </button>
        </div>
      </div>
    </Overlay>
  );
};
