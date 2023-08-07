import { inter_cn } from "@/components/fonts";
import * as React from "react";
import styles from "./SourceTypePill.module.css";

export interface SourceTypePillProps {
  name: string;
  onClick: () => void;
  color: string;
  isSelected: boolean;
  key?: string | number;
}

export const SourceTypePill: React.FunctionComponent<SourceTypePillProps> = (
  props
) => {
  const { color, name, key, onClick, isSelected } = props;

  return (
    <div
      className={inter_cn(styles.pill)}
      style={{
        color: isSelected ? "white" : color,
        backgroundColor: isSelected ? color : "white",
        border: `2px solid ${color}`,
      }}
      key={key}
      onClick={onClick}
    >
      {name}
    </div>
  );
};
