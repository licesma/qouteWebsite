import { QuoteData } from "@/types/QuoteData";
import { Inter, Montserrat } from "@next/font/google";
import * as React from "react";
import styles from "./FocusQuote.module.css";
import Image from "next/image";
import { QuoteElement } from "./QuoteElement";

interface QuoteContainerProps {
  quote?: QuoteData;
}

export const FocusQuote: React.FunctionComponent<QuoteContainerProps> = ({
  quote,
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.quoteContainer}>
        <Image alt={"ok"} width={80} height={50} src={"./opening.svg"} />
        <div className={styles.quote}>“Todas las shortys”</div>
        <div className={styles.author}></div>
        <div className={styles.source}></div>
      </div>
    </div>
  );
};
