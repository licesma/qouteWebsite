import { Modal } from "@/components/Modal";
import { inter_cn, montse_cn } from "@/components/fonts";
import {
  useNameSearchList,
  type SearchableName,
} from "@/core/Hook/useSearchList";
import { QuoteData } from "@/types/QuoteData";
import { getDocFromCache } from "firebase/firestore";
import { auth } from "firebaseui";
import Image from "next/image";
import * as React from "react";
import { DismissButton } from "./DismissButton";
import { ImageCropper } from "./ImageCropper";
import { InputQuoteContainer } from "./InputQuoteContainer";
import { InputText } from "./InputText/InputText";
import styles from "./NewQuoteModal.module.css";
import { Persona } from "./Persona";
import { SourceTypeContainer } from "./SourceTypeContainer";
import { StandardButton } from "./StandardButton";
import { Toggle } from "./Toggle";
import { useUserAuthors, useUserSources } from "./UserData/UserQuotes";
import { SuggestionList } from "./suggestion/SuggestionList";

export interface NewQuoteModalProps {
  userId: string;
  isOpen: boolean;
  onClose: () => void;
}

export const NewQuoteModal: React.FunctionComponent<NewQuoteModalProps> = (
  props
) => {
  const { isOpen, onClose, userId } = props;
  const [authorInput, setAuthorInput] = React.useState("");
  const [sourceInput, setSourceInput] = React.useState("");
  const [authorSuggestions, setAuthorSuggestions] = React.useState<Set<string>>(
    new Set()
  );
  const [sourceSuggestions, setSourceSuggestions] = React.useState<Set<string>>(
    new Set()
  );
  const [isAuthorSuggestionActive, setIsAuthorSuggestionActive] =
    React.useState(false);
  const [isSourceSuggestionActive, setIsSourceSuggestionActive] =
    React.useState(false);
  const [inputQuoteCount, setInputQuoteCount] = React.useState(1);
  const inputIndexes = Array.from({ length: inputQuoteCount }, (_, i) => i + 1);
  const authors = useUserAuthors(userId);
  const sources = useUserSources(userId);
  const authorArray: SearchableName[] = Array.from(authors.values());
  const sourceArray: SearchableName[] = Array.from(sources.values());

  const getAuthorSuggestions = useNameSearchList(authorArray);
  const getSourceSuggestions = useNameSearchList(sourceArray);

  const inputQuotes: (QuoteData | undefined)[] = Array.from(
    { length: inputQuoteCount },
    (_, i) => {
      return {
        author: authorInput,
        source: sourceInput,
        isConversation: false,
      };
    }
  );
  const inputElements = inputIndexes.map((key) => (
    <InputQuoteContainer key={key} />
  ));

  const onAuthorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAuthorInput(event.target.value);
    setIsAuthorSuggestionActive(true);
    setAuthorSuggestions(new Set(getAuthorSuggestions(event.target.value)));
  };

  const onSourceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSourceInput(event.target.value);
    setIsAuthorSuggestionActive(true);
    setSourceSuggestions(new Set(getSourceSuggestions(event.target.value)));
  };

  return isOpen ? (
    <Modal title={"New Quote"} isOpen={isOpen} onClose={onClose} fullModal>
      <>
        <div className={styles.container}>
          <div className={styles.authorContainer}>
            <div className={inter_cn(styles.labelAuthor)}>Author:</div>
            <div>
              <input
                className={montse_cn(styles.inputAuthor)}
                type={"text"}
                onChange={onAuthorChange}
                onFocus={() => setIsAuthorSuggestionActive(true)}
                onBlur={() => setIsAuthorSuggestionActive(false)}
              ></input>
              <SuggestionList
                itemMap={authors}
                suggestionType="Author"
                suggestedIds={authorSuggestions}
                isActive={isAuthorSuggestionActive}
              />
            </div>
          </div>
          <div className={styles.authorContainer}>
            <div className={inter_cn(styles.labelAuthor)}>Source:</div>
            <div>
              <input
                className={montse_cn(styles.inputAuthor)}
                type={"text"}
                onChange={onSourceChange}
                onFocus={() => setIsSourceSuggestionActive(true)}
                onBlur={() => setIsSourceSuggestionActive(false)}
              ></input>
              <SuggestionList
                itemMap={sources}
                suggestionType="Source"
                suggestedIds={sourceSuggestions}
                isActive={isSourceSuggestionActive}
              />
            </div>
            <SourceTypeContainer />
          </div>
          {inputElements}
          <button
            className={styles.addButton}
            onClick={() => setInputQuoteCount(inputQuoteCount + 1)}
          >
            “
          </button>
          <div className={styles.saveQuoteButton}>
            <StandardButton text={"Save"} fontSize={18} callback={() => {}} />
          </div>
        </div>
      </>
    </Modal>
  ) : null;
};
