import { QuoteData } from "@/types/QuoteData";
import { Inter, Montserrat } from "@next/font/google";
import * as React from "react";
import styles from "./QuoteContainer.module.css";
import { QuoteElement } from "./QuoteElement";

interface QuoteContainerProps {
  quotes: QuoteData[] | undefined;
  hideAuthor?: boolean;
  hideSource?: boolean;
}

export const QuoteContainer: React.FunctionComponent<QuoteContainerProps> = (
  props
) => {
  const { quotes, hideAuthor, hideSource } = props;
  return (
    <div className={styles.container}>
      {quotes?.map((quote, index) => (
        <QuoteElement
          key={index}
          quoteData={quote}
          hideAuthor={hideAuthor}
          hideSource={hideSource}
        />
      ))}
    </div>
  );
};
