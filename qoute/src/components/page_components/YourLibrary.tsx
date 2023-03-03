import { QuoteData } from "@/types/QuoteData";
import { Inter, Montserrat } from "@next/font/google";
import * as React from "react";
import { CreateButton } from "../CreateButton";
import { FilterBox } from "../FilterBox";
import { QuoteContainer } from "../QuoteContainer";
import { QuoteInput } from "../QuoteInput";
import { getUnrepeatedAuthors, getUnrepeatedSources } from "./Helper";
import styles from "./YourLibrary.module.css";

interface YourLibraryProps {
  quotes: QuoteData[];
}

export const YourLibrary: React.FunctionComponent<YourLibraryProps> = (
  props
) => {
  const { quotes } = props;
  const [fullInput, setFullInput] = React.useState(false);
  const [selectedAuthors, setSelectedAuthors] = React.useState<string[]>([]);
  const [selectedSources, setSelectedSources] = React.useState<string[]>([]);

  const onButtonCallback = () => {
    setFullInput(!fullInput);
  };

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

  const onInputHide = () => {
    setFullInput(false);
  };

  return (
    <div className={styles.center}>
      <div className={styles.mainContainer}>
        <div className={styles.leftRail}>
          <div
            className={styles.createButtonContainer}
            style={{ height: fullInput ? "384" : "100" }}
          >
            <CreateButton fullInput={fullInput} callback={onButtonCallback} />
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
          <QuoteInput show={fullInput} onHide={onInputHide} />
          <div
            className={styles.quoteList}
            style={{
              transform: fullInput ? "translateY(0px)" : "translateY(-60px)",
            }}
          >
            <QuoteContainer quotes={selectedQuotes} />
          </div>
        </div>
      </div>
    </div>
  );
};
