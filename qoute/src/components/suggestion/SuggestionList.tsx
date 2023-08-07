import * as React from "react";
import { Persona } from "../Persona";
import { useUserAuthorsByIds } from "../UserData/UserQuotes";
import { useAuthorPicture } from "../firebase/Hook/AuthorPicture";
import { AuthorSuggestion } from "./AuthorSuggestion";
import { SuggestionProps } from "./Schema";
import { SourceSuggestion } from "./SourceSuggestion";
import styles from "./SuggestionList.module.css";

export type SuggestionType = "Author" | "Source";

interface SuggestionItem {
  name: string;
  id: string;
}

export interface SuggestionListProps {
  isActive: boolean;
  suggestionType: SuggestionType;
  itemMap: Map<string, SuggestionItem>;
  suggestedIds: Set<string>;
}

const authorIds = [
  "MlqluPjE49vvSyDThY9x",
  "dEkqD6RmBo9D8zjmUKMF",
  "dDuMU0sLpTzSYq0RLPo0",
];

const MAX_SUGGESTIONS = 5;

export const SuggestionList: React.FunctionComponent<SuggestionListProps> = (
  props
) => {
  const { itemMap, suggestedIds, suggestionType, isActive } = props;
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const suggestionListRef = React.createRef<HTMLDivElement>();
  const suggestions = getSuggestionById(
    itemMap,
    Array.from(suggestedIds.values())
  );
  const suggestionRenderer = getSuggestionRenderer(suggestionType);

  const onArrowDown = () => {
    setSelectedIndex((selectedIndex) =>
      Math.min(MAX_SUGGESTIONS - 1, selectedIndex + 1)
    );
  };

  const onArrowUp = () => {
    setSelectedIndex((selectedIndex) => Math.max(0, selectedIndex - 1));
  };

  const getOnClick = (index: number) => () => {
    setSelectedIndex(index);
  };

  useKeyPress("ArrowDown", suggestionListRef, onArrowDown);
  useKeyPress("ArrowUp", suggestionListRef, onArrowUp);

  return isActive ? (
    <div className={styles.container} ref={suggestionListRef}>
      {suggestions.map((suggestion, index) =>
        suggestionRenderer({
          key: index,
          id: suggestion.id,
          name: suggestion.name,
          isSelected: selectedIndex === index,
          onClick: getOnClick(index),
        })
      )}
    </div>
  ) : null;
};

function getSuggestionById(
  itemMap: Map<string, SuggestionItem>,
  ids: string[]
) {
  return ids
    .map((sourceId) => itemMap.get(sourceId))
    .filter((source): source is SuggestionItem => source !== undefined);
}

/* eslint-disable react/display-name */
const getSuggestionRenderer =
  (suggestionType: SuggestionType) => (props: SuggestionProps) => {
    switch (suggestionType) {
      case "Author":
        return <AuthorSuggestion {...props} />;
      case "Source":
        return <SourceSuggestion {...props} />;
    }
  };

const useKeyPress = function (
  targetKey: string,
  ref: React.RefObject<HTMLDivElement>,
  callback: () => void
) {
  const [keyPressed, setKeyPressed] = React.useState(false);

  const keyUpHandler = ({ key }: { key: string }) => {
    if (key === targetKey) {
      setKeyPressed(false);
    }
  };

  React.useEffect(() => {
    ref.current?.addEventListener("keyup", keyUpHandler);

    return () => {
      ref.current?.removeEventListener("keyup", keyUpHandler);
    };
  });
};
