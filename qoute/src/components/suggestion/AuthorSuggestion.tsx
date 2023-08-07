import * as React from "react";
import { Persona } from "../Persona";
import { useAuthorPicture } from "../firebase/Hook/AuthorPicture";
import { montse_cn } from "../fonts";
import styles from "./AuthorSuggestion.module.css";
import type { SuggestionProps } from "./Schema";

export interface SuggestionProps {
  key: string | number;
  id: string;
  name: string;
  isSelected: boolean;
  onSelected;
}

export const AuthorSuggestion: React.FunctionComponent<SuggestionProps> = (
  props
) => {
  const { key, id, name, isSelected } = props;

  const { data: authorPicture } = useAuthorPicture(id);

  return (
    <div
      className={montse_cn(styles.container)}
      key={key}
      style={{ backgroundColor: isSelected ? "#c0c0c0" : undefined }}
    >
      <Persona size={30} name={name} imageLink={authorPicture} />
      {name}
    </div>
  );
};
