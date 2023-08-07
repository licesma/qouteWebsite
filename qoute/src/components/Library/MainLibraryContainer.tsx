import { useUserQuotes } from "@/api/firebase/UserQuotes";
import { useAllUserQuotesData } from "@/components/api/AllUserQuotes";
import { useUserQuotes2 } from "@/components/firebase/Hook/UserQuotes";
import { QuoteData } from "@/types/QuoteData";
import { Inter, Montserrat } from "@next/font/google";
import * as React from "react";
import { CreateButton } from "../CreateButton";
import { LibraryLeftMenu } from "../LibraryLeftMenu";
import { NewQuoteButton } from "../NewQuoteButton";
import { Overlay } from "../Overlay";
import { QuoteContainer } from "../QuoteContainer";
import { QuoteInput } from "../QuoteInput";
import { MultiSelectBox } from "../SelectBox/MultiSelectBox";
import { StandardButton } from "../StandardButton";
import { useUserAuthors, useUserSources } from "../UserData/UserQuotes";
import { useQuotesData } from "../api/AllQuotes";
import { useCurrentUser } from "../firebase/Hook/Auth";
import { AllQuotesLibrary } from "./AllQuotesLibrary";
import { AuthorLibrary } from "./AuthorLibrary";
import styles from "./MainLibraryContainer.module.css";

export type LibraryType = "AllQuotes" | "Favorites" | "Authors" | "Sources";

interface MainLibraryContainerProps {
  userId: string;
  type: LibraryType;
}

export const MainLibraryContainerProps: React.FunctionComponent<
  MainLibraryContainerProps
> = (props) => {
  const { type, userId } = props;

  const [isQuickAddActive, setIsQuickAddActive] =
    React.useState<boolean>(false);
  const onShowQuickAdd = () => {
    setIsQuickAddActive(true);
  };

  const onQuickAddHide = () => {
    setIsQuickAddActive(false);
  };
  const { data: quotes } = useUserQuotes(userId);
  const authors = useUserAuthors(userId);
  const sources = useUserSources(userId);
  const quotes2 = useQuotesData();

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
              <NewQuoteButton userId={userId} />
            </div>
            <div className={styles.leftMenuFrame}>
              <LibraryLeftMenu />
            </div>
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
