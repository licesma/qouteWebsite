import { FocusQuote } from "@/components/FocusQuote";
import { YourLibrary } from "@/components/Library/MainLibraryContainer";
import { NavigationBar } from "@/components/NavigationBar";
import { QuoteContainer } from "@/components/QuoteContainer";
import { QuoteInput } from "@/components/QuoteInput";
import { useFirestore } from "@/components/firebase/FirebaseProvider";
import { QuoteData } from "@/types/QuoteData";
import { Inter } from "@next/font/google";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import styles from "./../app/page.module.css";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [hasFecthed, setHasFetched] = useState<Boolean>(false);
  const [quotes, setQuotes] = useState<QuoteData[]>([]);
  const firestore = useFirestore();
  useEffect(() => {
    (async () => {
      const docRef = doc(firestore, "quotes", "yQ1QRTVFTNVPCtRRKICa");
      const docSnap = await getDoc(docRef);
      const docObject = docSnap.data();
      const arrayData: QuoteData[] = docObject ? Object.values(docObject) : [];
      setQuotes(arrayData);
      setHasFetched(true);
    })();

    return () => {};
  }, []);

  return (
    <>
      <main className={styles.main}>
        <NavigationBar />
        <FocusQuote />
      </main>
      <div className={styles.footer}>Made with ♥ in CDMX.</div>
    </>
  );
}
