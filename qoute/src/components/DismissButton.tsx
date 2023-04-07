import { QuoteData } from "@/types/QuoteData";
import { Inter, Montserrat } from "@next/font/google";
import * as React from "react";
import Image from "next/image";
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
    <div className={styles.contaffienr}>
      <Image
        className={styles.button}
        alt={"ok"}
        width={20}
        height={20}
        src={"./dismiss.svg"}
      />
    </div>
  );
};
