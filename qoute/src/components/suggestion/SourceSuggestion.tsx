import * as React from "react";
import { montse_cn } from "../fonts";
import type { SuggestionProps } from "./Schema";
import styles from "./SourceSuggestion.module.css";

export const SourceSuggestion: React.FunctionComponent<SuggestionProps> = (
  props
) => {
  const { key, id, name, isSelected } = props;

  return (
    <div
      className={montse_cn(styles.container)}
      key={key}
      style={{ backgroundColor: isSelected ? "#c0c0c0" : undefined }}
    >
      {name}
    </div>
  );
};
