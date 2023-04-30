import styles from "./AuthorLibrary.module.css";
import * as React from "react";
import { MultiSelectBox } from "../SelectBox/MultiSelectBox";
import { QuoteContainer } from "../QuoteContainer";
import {
  getUnrepeatedAuthors,
  getUnrepeatedSources,
} from "../page_components/Helper";
import { QuoteData } from "@/types/QuoteData";
import { AuthorCard } from "../AuthorCard";

export interface AuthorLibraryProps {
  quotes: QuoteData[];
}

export const AuthorLibrary: React.FunctionComponent<AuthorLibraryProps> = (
  props
) => {
  const { quotes } = props;
  const [selectedAuthors, setSelectedAuthors] = React.useState<string[]>([]);
  const [selectedSources, setSelectedSources] = React.useState<string[]>([]);

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

  return (
    <div className={styles.authorContainer}>
      <AuthorCard />

      <AuthorCard />

      <AuthorCard />

      <AuthorCard />
      <AuthorCard />

      <AuthorCard />

      <AuthorCard />

      <AuthorCard />

      <AuthorCard />

      <AuthorCard />
    </div>
  );
};
