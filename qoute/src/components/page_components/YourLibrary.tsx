import { QuoteData } from "@/types/QuoteData";
import { Inter, Montserrat } from "@next/font/google";
import * as React from "react";
import { CreateButton } from "../CreateButton";
import { FilterBox } from "../FilterBox";
import { Overlay } from "../Overlay";
import { QuoteContainer } from "../QuoteContainer";
import { QuoteInput } from "../QuoteInput";
import { StandardButton } from "../StandardButton";
import { getUnrepeatedAuthors, getUnrepeatedSources } from "./Helper";
import styles from "./YourLibrary.module.css";

interface YourLibraryProps {
  quotes: QuoteData[];
}

export const YourLibrary: React.FunctionComponent<YourLibraryProps> = (
  props
) => {
  const { quotes } = props;
  const [selectedAuthors, setSelectedAuthors] = React.useState<string[]>([]);
  const [selectedSources, setSelectedSources] = React.useState<string[]>([]);
  const [isQuickAddActive, setIsQuickAddActive] = React.useState<boolean>(true);

  const quotesByAuthor = React.useMemo(() => {
    const authorSet = new Set(selectedAuthors);
    return quotes.filter(
      (quote) => authorSet.size === 0 || authorSet.has(quote.author)
    );
  }, [quotes, selectedAuthors]);

  const quotesBySource = React.useMemo(() => {
    const sourceSet = new Set(selectedSources);
    return quotes.filter(
      (quote) => sourceSet.size === 0 || sourceSet.has(quote.source)
    );
  }, [quotes, selectedSources]);

  const selectedQuotes = React.useMemo(
    () => quotesByAuthor.filter((quote) => quotesBySource.includes(quote)),
    [quotesByAuthor, quotesBySource]
  );

  const onAuthorFilterBoxChange = (selectedValues: string[]) => {
    setSelectedAuthors(selectedValues);
  };

  const onSourceFilterBoxChange = (selectedValues: string[]) => {
    setSelectedSources(selectedValues);
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
              <StandardButton text={"Quick add"} callback={() => {}} />
            </div>
            <FilterBox
              placeholder="Author"
              filterOptions={getUnrepeatedAuthors(quotesBySource)}
              onSelect={onAuthorFilterBoxChange}
            />

            <FilterBox
              placeholder="Source"
              filterOptions={getUnrepeatedSources(quotesByAuthor)}
              onSelect={onSourceFilterBoxChange}
            />
          </div>
          <div className={styles.middleContainer}>
            <div className={styles.quoteList}>
              <QuoteContainer quotes={selectedQuotes} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
