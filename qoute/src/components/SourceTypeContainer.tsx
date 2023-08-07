import * as React from "react";
import styles from "./SourceTypeContainer.module.css";
import { SourceTypePill } from "./SourceTypePill";

export interface SourceTypeContainerProps {}

export const SOURCE_TYPES = ["Book", "Movie", "Poem", "Song"] as const;
export const PILLS_COLORS = ["#da7435", "#885aa9", "#44953b", "#3194c1"];
type SourceType = (typeof SOURCE_TYPES)[number];
export const SourceTypeContainer: React.FunctionComponent<
  SourceTypeContainerProps
> = (props) => {
  const [selectedType, setSelectedType] = React.useState<
    SourceType | undefined
  >(undefined);

  const onPillClick = (pillType: SourceType) =>
    setSelectedType(pillType === selectedType ? undefined : pillType);
  return (
    <>
      {SOURCE_TYPES.map((pillType, index) => (
        <SourceTypePill
          key={index}
          name={pillType}
          color={PILLS_COLORS[index]}
          isSelected={pillType === selectedType}
          onClick={() => onPillClick(pillType)}
        />
      ))}
    </>
  );
};
