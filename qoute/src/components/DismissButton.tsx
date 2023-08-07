import { QuoteData } from "@/types/QuoteData";
import { Inter, Montserrat } from "@next/font/google";
import Image from "next/image";
import * as React from "react";
import styles from "./DismissButton.module.css";
import { QuoteElement } from "./QuoteElement";

interface DismissButtonProps {
  onClick: () => void;
  size?: number;
  weight?: number;
  color?: string;
}
const defaultSize = 20;
const defaultWeight = 2;
const defaultColor = "#494949";

export const DismissButton: React.FunctionComponent<DismissButtonProps> = (
  props
) => {
  const { size: sizeProp, weight: weightProp, color: colorProp } = props;
  const size = sizeProp ?? defaultSize;
  const weight = weightProp ?? defaultWeight;
  const color = colorProp ?? defaultColor;
  const { onClick } = props;
  return (
    <div
      className={styles.container}
      onClick={onClick}
      style={{ width: size, height: size, borderRadius: `${size / 4}px` }}
    >
      <div
        className={styles.incline}
        style={{
          width: `${weight}px`,
          height: `${size}px`,
          backgroundColor: color,
        }}
      />
      <div
        className={styles.decline}
        style={{
          width: `${weight}px`,
          height: `${size}px`,
          backgroundColor: color,
        }}
      />
    </div>
  );
};
