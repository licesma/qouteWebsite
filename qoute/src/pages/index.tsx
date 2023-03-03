import { CreateButton } from "@/components/CreateButton";
import { FilterMenu } from "@/components/FilterMenu";
import { MainLogo } from "@/components/MainLogo";
import { NavigationBar } from "@/components/NavigationBar";
import { YourLibrary } from "@/components/page_components/YourLibrary";
import { QuoteContainer } from "@/components/QuoteContainer";
import { QuoteInput } from "@/components/QuoteInput";
import { QuoteData } from "@/types/QuoteData";
import { Inter } from "@next/font/google";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { firestore } from "./../app/firebase";
import styles from "./../app/page.module.css";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [hasFecthed, setHasFetched] = useState<Boolean>(false);
  const [quotes, setQuotes] = useState<QuoteData[]>([]);

  useEffect(() => {
    (async () => {
      const docRef = doc(firestore, "quotes", "all_quotes");
      console.log(docRef);
      const docSnap = await getDoc(docRef);
      console.log(docSnap);
      const docObject = docSnap.data();
      console.log(docObject);
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
        <YourLibrary quotes={quotes} />
      </main>
      <div className={styles.footer}>Made with ♥ in CDMX.</div>
    </>
  );
}
