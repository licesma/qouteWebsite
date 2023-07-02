import { QuoteData } from "@/types/QuoteData";
import { Inter, Montserrat } from "@next/font/google";
import * as React from "react";
import styles from "./QuoteContainer.module.css";
import { QuoteElement } from "./QuoteElement";

interface QuoteContainerProps {
  quotes: QuoteData[] | undefined;
}

export const QuoteContainer: React.FunctionComponent<QuoteContainerProps> = ({
  quotes,
}) => {
  return (
    <div className={styles.container}>
      {quotes?.map((quote, index) => (
        <QuoteElement key={index} quoteData={quote} />
      ))}
    </div>
  );
};
