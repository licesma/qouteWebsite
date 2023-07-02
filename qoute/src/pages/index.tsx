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
import styles from "./../app/page.module.css";
import { useQuotesData } from "@/components/api/AllQuotes";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { data: quotes } = useQuotesData();

  return (
    <>
      <main className={styles.main}>
        <NavigationBar />
        <MainLibraryContainerProps quotes={quotes} type={"AllQuotes"} />
      </main>
      <div className={styles.footer}>Made with ♥ in CDMX.</div>
    </>
  );
}
