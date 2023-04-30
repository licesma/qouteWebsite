import { QuoteData } from "@/types/QuoteData";
import { Inter, Montserrat } from "@next/font/google";
import * as React from "react";
import styles from "./Quote.module.css";

const inter = Inter({ subsets: ["latin"] });
const montserrat = Montserrat({ subsets: ["latin"] });

interface QuoteElementProps {
  quoteData: QuoteData;
}

export const QuoteElement: React.FunctionComponent<QuoteElementProps> = (
  props
) => {
  const { quoteData: data } = props;

  return (
    <div className={styles.container}>
      <div className={styles.activeBar} />
      <div className={styles.textContainer}>
        <div className={`${montserrat.className}`}>{`“${data.quote}”`}</div>
        <div className={styles.sourceData}>
          <div className={`${styles.authorR} ${montserrat.className}`}>
            — Albus Dumbledore
          </div>
        </div>
        <div className={styles.sourceData}>
          <div className={`${styles.author} ${montserrat.className}`}>
            ~ {data.author}
            {data.source ? (
              <span className={styles.reference}>, {data.source}</span>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};
