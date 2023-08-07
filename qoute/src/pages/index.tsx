import { useUserQuotes } from "@/api/firebase/UserQuotes";
import { MainLibraryContainerProps } from "@/components/Library/MainLibraryContainer";
import { NavigationBar } from "@/components/NavigationBar";
import { QuoteContainer } from "@/components/QuoteContainer";
import { QuoteInput } from "@/components/QuoteInput";
import { useQuotesData } from "@/components/api/AllQuotes";
import { useAllUserQuotesData } from "@/components/api/AllUserQuotes";
import { useFirestore } from "@/components/firebase/FirebaseProvider";
import { useCurrentUser } from "@/components/firebase/Hook/Auth";
import { QuoteData } from "@/types/QuoteData";
import { Inter } from "@next/font/google";
import { useQuery } from "@tanstack/react-query";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import Link from "next/link";
import * as React from "react";
import { useContext, useEffect, useState } from "react";
import styles from "./../app/page.module.css";

const inter = Inter({ subsets: ["latin"] });

export function useQuotesQuery() {
  const firestore = useFirestore();

  return useQuery({
    queryKey: ["quotes7"],
    queryFn: () =>
      getDocs(collection(firestore, "quotes")).then((quoteDocuments) => {
        const quotes = quoteDocuments.docs.map<QuoteData>(
          (quoteDoc) => quoteDoc.data() as QuoteData
        );
        return quotes;
      }),
  });
}

export default function Home() {
  const { id } = useCurrentUser();
  const [hasFecthed, setHasFetched] = useState<Boolean>(false);
  const [quotes, setQuotes] = useState<QuoteData[]>([]);
  const query2 = useQuotesData();
  const firestore = useFirestore();
  const query3 = useUserQuotes("ok");
  const query = useQuotesQuery();

  useQuery({
    queryKey: ["quotes"],
    queryFn: () =>
      getDocs(collection(firestore, "ursss")).then((quotes) => {
        console.log("isbelas", quotes);
        quotes.docs.map<QuoteData>((quoteDoc) => quoteDoc.data() as QuoteData);
      }),
  });

  return (
    <>
      <main className={styles.main}>
        <NavigationBar />
        {id ? (
          <MainLibraryContainerProps type={"AllQuotes"} userId={id} />
        ) : (
          <div>User not logged</div>
        )}
      </main>
      <div className={styles.footer}>Made with ♥ in CDMX.</div>
    </>
  );
}
