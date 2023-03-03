import { QuoteData } from "@/types/QuoteData";
import { Inter, Montserrat } from "@next/font/google";
import * as React from "react";
import styles from "./DismissButton.module.css";
import { QuoteElement } from "./QuoteElement";

interface DismissButtonProps {
  onClick: () => void;
}

export const DismissButton: React.FunctionComponent<DismissButtonProps> = (
  props
) => {
  const { onClick } = props;
  return (
    <div className={styles.container} onClick={onClick}>
      <div className={styles.incline} />
      <div className={styles.decline} />
    </div>
  );
};
