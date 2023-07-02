import { Inter } from "@next/font/google";
import { useRouter } from "next/router";
import { GUTENLY_BASE } from "@/app/constants/Navigation";
import { isSignInWithEmailLink, signInWithEmailLink } from "firebase/auth";
import * as React from "react";
import styles from "./author.module.css";
import Image from "next/image";
import { Switch } from "antd";
import { useAuth } from "@/components/firebase/FirebaseProvider";
import { useCurrentUser } from "@/components/firebase/Hook/Auth";
import { UserRegister } from "@/components/page_components/UserRegister";
import { Persona } from "@/components/Persona";
import { PersonaEditor } from "@/components/PersonaEditor";
import { NavigationBar } from "@/components/NavigationBar";
import { MainLibraryContainerProps } from "@/components/Library/MainLibraryContainer";
import { inter_cn, montse_cn, nuno_cn } from "@/components/fonts";

const forceRegister = true;

export default function VerifySignInPage() {
  const [isFirstTimeUser, setIsFirstTimeUser] = React.useState(false);
  const [isUserVerified, setIsUserVerified] = React.useState(false);
  const router = useRouter();
  const { auth } = useAuth();
  const authorId = router.query.authorId;
  const { name, email } = useCurrentUser();
  const [isSwitchInGutenly, setIsSwitchInGutenly] = React.useState(false);

  React.useEffect(() => {
    console.log(authorId);
  }, [authorId]);

  React.useEffect(() => {
    if (isUserVerified && email && !name) {
      setIsFirstTimeUser(true);
    }
  }, [isUserVerified, email, name]);

  if (email && name) {
    window.location.replace(`${GUTENLY_BASE}/`);
  }

  return (
    <main className={styles.main}>
      <NavigationBar />
      <div className={styles.authorPageContainer}>
        <div className={styles.authorContainer}>
          <div className={styles.authorHeader}>
            <Persona size={200} name={"Garcia Marquez"} />
            <div className={styles.nameAndSwitch}>
              <h1 className={inter_cn(styles.authorName)}>
                Gabriel García Márquez
              </h1>
              <Switch
                className={styles.switch}
                style={{
                  marginLeft: "auto",
                  backgroundColor: isSwitchInGutenly ? "green" : undefined,
                }}
                checkedChildren={"Your Library"}
                unCheckedChildren={"Public Profile"}
                onChange={() => {
                  setIsSwitchInGutenly((prev) => !prev);
                }}
              />
            </div>
          </div>
          <div className={inter_cn(styles.gutenlySelectionContainer)}>
            <div className={styles.sectionLabel}>Gutenly Selection</div>
            <div className={montse_cn(styles.gutenlySelection)}>
              {"“"}La vida no es lo que uno vivió, sino lo que recuerda y cómo
              lo recuerda para contarla
              {"”"}
            </div>
          </div>
          <div className={styles.popularBooksContainer}>
            <div className={inter_cn(styles.sectionHeader)}>
              <div className={inter_cn(styles.sectionLabel)}>Books</div>
              <div className={nuno_cn(styles.seeAllLink)}>All books</div>
            </div>
            <div className={inter_cn(styles.popularBooks)}>
              {[getBook(), getBook(), getBook(), getBook()]}
            </div>
          </div>
          <div className={styles.popularQuotesContainer}>
            <div className={inter_cn(styles.sectionHeader)}>
              <div className={inter_cn(styles.sectionLabel)}>Quotes</div>
              <div className={nuno_cn(styles.seeAllLink)}>All quotes</div>
            </div>
            <div className={inter_cn(styles.popularQuotes)}>
              {[getQuote(), getQuote(), getQuote(), getQuote()]}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export function getBook() {
  return (
    <div className={styles.authorBookCard}>
      <Image
        className={styles.authorBookImage}
        alt={"ok"}
        width={150}
        height={180}
        src={"/book_placeholder.svg"}
      />
      <div className={styles.authorBookTitle}>
        El amor en los tiempos del Colera
      </div>
    </div>
  );
}

export function getQuote() {
  return (
    <div className={styles.authorQuoteCard}>
      <div className={styles.authorQuote}>
        Esta vida que nos hace padre de nuestros padres
      </div>
      <div className={styles.authorQuoteSource}>
        -El amor en los tiempos del Cólera
      </div>
    </div>
  );
}
