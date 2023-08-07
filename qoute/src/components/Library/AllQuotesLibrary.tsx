import { QuoteData } from "@/types/QuoteData";
import * as React from "react";
import { QuoteContainer } from "../QuoteContainer";
import { MultiSelectBox } from "../SelectBox/MultiSelectBox";
import {
  getUnrepeatedAuthors,
  getUnrepeatedSources,
} from "../page_components/Helper";
import styles from "./AllQuotesLibrary.module.css";

export interface AllQuotesLibraryProps {
  quotes: QuoteData[] | undefined;
}

export const AllQuotesLibrary: React.FunctionComponent<
  AllQuotesLibraryProps
> = (props) => {
  const { quotes } = props;
  const [selectedAuthors, setSelectedAuthors] = React.useState<string[]>([]);
  const [selectedSources, setSelectedSources] = React.useState<string[]>([]);

  const quotesByAuthor = React.useMemo(() => {
    const authorSet = new Set(selectedAuthors);
    return quotes?.filter(
      (quote) => authorSet.size === 0 || authorSet.has(quote.author)
    );
  }, [quotes, selectedAuthors]);

  const quotesBySource = React.useMemo(() => {
    const sourceSet = new Set(selectedSources);
    return quotes?.filter(
      (quote) => sourceSet.size === 0 || sourceSet.has(quote.source)
    );
  }, [quotes, selectedSources]);

  const selectedQuotes = React.useMemo(
    () => quotesByAuthor?.filter((quote) => quotesBySource?.includes(quote)),
    [quotesByAuthor, quotesBySource]
  );

  const onAuthorFilterBoxChange = (selectedValues: string[]) => {
    setSelectedAuthors(selectedValues);
  };

  const onSourceFilterBoxChange = (selectedValues: string[]) => {
    setSelectedSources(selectedValues);
  };

  return (
    <>
      <div className={styles.filterContainer}>
        <div className={styles.filter}>
          <MultiSelectBox
            placeholder="Author"
            filterOptions={getUnrepeatedAuthors(quotesBySource)}
            onSelect={onAuthorFilterBoxChange}
          />
        </div>
        <div className={styles.filter}>
          <MultiSelectBox
            placeholder="Source"
            filterOptions={getUnrepeatedSources(quotesByAuthor)}
            onSelect={onSourceFilterBoxChange}
          />
        </div>
      </div>
      <div className={styles.libraryContainer}>
        <QuoteContainer quotes={selectedQuotes} />
      </div>
    </>
  );
};
