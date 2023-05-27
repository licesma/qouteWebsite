import { Inter } from "@next/font/google";
import * as React from "react";
import { MainLogo } from "./MainLogo";
import { Overlay } from "./Overlay";
import styles from "./NavigationBar.module.css";
import { useAuth } from "./firebase/FirebaseProvider";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { onLog } from "firebase/app";
import { LoginOverlay } from "./LoginOverlay";

const inter = Inter({ subsets: ["latin"] });

export interface MainLogoProps {}

type NavigationBarItem = "YourLibrary" | "Explore" | "About";

export const NavigationBar: React.FunctionComponent<MainLogoProps> = (
  props
) => {
  const [selectedItem, setSelectedItem] =
    React.useState<NavigationBarItem>("YourLibrary");
  const [isLoginOverlayEnabled, setIsLoginOverlayEnabled] =
    React.useState(false);
  const [isUserSigned, setIsUserSigned] = React.useState(false);
  const auth = useAuth();

  React.useEffect(() => {
    return onAuthStateChanged(auth, (user) => {
      setIsUserSigned(user !== null);
    });
  }, []);

  const onLoginOverlayDismiss = () => {
    setIsLoginOverlayEnabled(false);
  };

  return (
    <>
      {isLoginOverlayEnabled ? (
        <LoginOverlay onDismiss={onLoginOverlayDismiss} />
      ) : null}
      <div className={styles.container}>
        <MainLogo />
        <div
          className={styles.card}
          onClick={() => setSelectedItem("YourLibrary")}
        >
          <h2
            className={inter.className}
            style={getDynamicStyle("YourLibrary", selectedItem)}
          >
            Your Library
          </h2>
          <div
            className={styles.selectedBar}
            style={getBarDStyle("YourLibrary", selectedItem)}
          />
        </div>
        <div className={styles.card} onClick={() => setSelectedItem("Explore")}>
          <h2
            className={inter.className}
            style={getDynamicStyle("Explore", selectedItem)}
          >
            Explore
          </h2>
          <div
            className={styles.selectedBar}
            style={getBarDStyle("Explore", selectedItem)}
          />
        </div>

        <div className={styles.card} onClick={() => setSelectedItem("About")}>
          <h2
            className={inter.className}
            style={getDynamicStyle("About", selectedItem)}
          >
            About
          </h2>
          <div
            className={styles.selectedBar}
            style={getBarDStyle("About", selectedItem)}
          />
        </div>

        <div className={styles.userMenu}>
          <div
            className={isUserSigned ? styles.userCard : styles.singInCard}
            onClick={() => {
              setIsLoginOverlayEnabled(true);
            }}
          >
            {" "}
            {isUserSigned ? (
              <div className={`${styles.userItem} ${inter.className}`}>
                {"Esteban"}
              </div>
            ) : (
              <div className={`${inter.className}`}>{"Sign in"} </div>
            )}
          </div>
          <div
            className={styles.userDropdown}
            style={{ display: isUserSigned ? undefined : "none" }}
          >
            <div className={`${styles.userItem} ${inter.className}`}>
              {"Sign in"}{" "}
            </div>
            <div className={`${styles.otherItem} ${inter.className}`}>
              {"Account"}{" "}
            </div>
            <div
              className={`${styles.otherItem} ${inter.className}`}
              style={{ boxShadow: "none" }}
              onClick={() => {
                signOut(auth);
              }}
            >
              {"Log out"}{" "}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const getDynamicStyle = (
  item: NavigationBarItem,
  selectedItem: NavigationBarItem
) => {
  return item === selectedItem
    ? {
        color: "rgb(3, 152, 97)",
        textShadow: "0 0 20px rgba(61, 61, 61, 0.1), 0 0 100px currentColor",
      }
    : undefined;
};

const getSpanDynamicStyle = (
  item: NavigationBarItem,
  selectedItem: NavigationBarItem
) => {
  return item === selectedItem
    ? {
        display: "none",
      }
    : undefined;
};

const getBarDStyle = (
  item: NavigationBarItem,
  selectedItem: NavigationBarItem
) => {
  return item === selectedItem
    ? undefined
    : {
        visibility: "hidden",
      };
};
