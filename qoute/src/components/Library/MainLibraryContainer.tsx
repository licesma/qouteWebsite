import { QuoteData } from "@/types/QuoteData";
import { Inter, Montserrat } from "@next/font/google";
import * as React from "react";
import { CreateButton } from "../CreateButton";
import { MultiSelectBox } from "../SelectBox/MultiSelectBox";
import { LibraryLeftMenu } from "../LibraryLeftMenu";
import { Overlay } from "../Overlay";
import { QuoteContainer } from "../QuoteContainer";
import { QuoteInput } from "../QuoteInput";
import { StandardButton } from "../StandardButton";
import styles from "./MainLibraryContainer.module.css";
import { AllQuotesLibrary } from "./AllQuotesLibrary";
import { AuthorLibrary } from "./AuthorLibrary";

export type LibraryType = "AllQuotes" | "Favorites" | "Authors" | "Sources";

interface MainLibraryContainerProps {
  quotes: QuoteData[] | undefined;
  type: LibraryType;
}

export const MainLibraryContainerProps: React.FunctionComponent<
  MainLibraryContainerProps
> = (props) => {
  const { quotes, type } = props;
  const [isQuickAddActive, setIsQuickAddActive] =
    React.useState<boolean>(false);
  const onShowQuickAdd = () => {
    setIsQuickAddActive(true);
  };

  const onQuickAddHide = () => {
    setIsQuickAddActive(false);
  };

  return (
    <>
      {isQuickAddActive ? <QuoteInput onHide={onQuickAddHide} /> : null}
      <div className={styles.center}>
        <div className={styles.mainContainer}>
          <div className={styles.leftRail}>
            <div
              className={styles.createButtonContainer}
              style={{ height: "100" }}
            >
              <StandardButton text={"Quick add"} callback={onShowQuickAdd} />
            </div>
            <LibraryLeftMenu />
          </div>
          <div className={styles.contentContainer}>
            {type === "Authors" ? (
              <AuthorLibrary quotes={quotes} />
            ) : (
              <AllQuotesLibrary quotes={quotes} />
            )}
          </div>
        </div>
      </div>
    </>
  );
};
