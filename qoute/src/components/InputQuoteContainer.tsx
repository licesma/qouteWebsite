import * as React from "react";
import { montse_cn } from "@/components/fonts";
import styles from "./InputQuoteContainer.module.css";
import { Toggle } from "./Toggle";
import { DismissButton } from "./DismissButton";
import { useAutosizeTextArea, getCursorPosition } from "./InputQuoteHelpers";
import { InputQuote } from "./InputQuote";
import { QuoteData } from "@/types/QuoteData";

export interface InputQuoteContainerProps {
  key: string | number;
}

export const InputQuoteContainer: React.FunctionComponent<
  InputQuoteContainerProps
> = (props) => {
  const { key } = props;
  const [isDialogue, setIsDialogue] = React.useState(false);
  const [isDismissed, setIsDismissed] = React.useState(false);
  const [inputCount, setInputCount] = React.useState(1);
  const inputIndexes = Array.from({ length: inputCount }, (_, i) => i + 1);

  const onDialogToggleChange = () => {
    setIsDialogue((pastValue) => !pastValue);
  };

  const dialogues = inputIndexes.map((key) => (
    <InputQuote key={key} isDialogue />
  ));

  const quote = <InputQuote key={0} />;

  React.useEffect(() => console.log(inputIndexes));

  React.useEffect(() => {
    if (!isDialogue) {
      setInputCount(1);
    }
  }, [isDialogue]);

  return isDismissed ? null : (
    <div key={key} className={styles.quoteContainer}>
      <div className={styles.leftBar} />
      <div className={styles.inputContainer}>
        {isDialogue ? dialogues : quote}
        <button
          className={styles.addDialogue}
          style={{ display: isDialogue ? undefined : "none" }}
          onClick={() => {
            setInputCount(inputCount + 1);
          }}
        >
          +
        </button>
      </div>
      <div className={styles.controlContainer}>
        <Toggle
          leftLabel={"Quote"}
          rightLabel={"Dialogue"}
          onChange={onDialogToggleChange}
        />
        <div className={styles.dismissButton}>
          <DismissButton
            color="#a32424"
            onClick={() => {
              setIsDismissed(true);
            }}
          />
        </div>
      </div>
    </div>
  );
};
