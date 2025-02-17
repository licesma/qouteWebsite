import { useFirestore } from "@/components/firebase/FirebaseProvider";
import { NavigationBar } from "@/components/NavigationBar";
import { MainLibraryContainerProps } from "@/components/Library/MainLibraryContainer";
import { QuoteContainer } from "@/components/QuoteContainer";
import { QuoteInput } from "@/components/QuoteInput";
import { QuoteData } from "@/types/QuoteData";
import { Inter } from "@next/font/google";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import styles from "./../../app/page.module.css";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [hasFecthed, setHasFetched] = useState<Boolean>(false);
  const [quotes, setQuotes] = useState<QuoteData[]>([]);
  const firestore = useFirestore();
  useEffect(() => {
    (async () => {
      const quoteDocuments = await getDocs(collection(firestore, "quotes"));
      const quotes = quoteDocuments.docs.map<QuoteData>(
        (quoteDoc) => quoteDoc.data() as QuoteData
      );
      setQuotes(quotes);
      setHasFetched(true);
    })();

    return () => {};
  }, [firestore]);

  return (
    <>
      <main className={styles.main}>
        <NavigationBar />
        <MainLibraryContainerProps quotes={quotes} type={"Authors"} />
      </main>
      <div className={styles.footer}>Made with ♥ in CDMX.</div>
    </>
  );
}
