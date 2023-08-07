import styles from "./InputQuote.module.css";
import { montse_cn } from "@/components/fonts";
import { useAutosizeTextArea, getCursorPosition } from "./InputQuoteHelpers";
import * as React from "react";
import { DismissButton } from "./DismissButton";

export interface InputQuoteProps {
  key: number | string;
  isDialogue?: boolean;
}

export const InputQuote: React.FunctionComponent<InputQuoteProps> = (props) => {
  const { isDialogue, key } = props;
  const [isDismissed, setIsDismissed] = React.useState(false);
  const inputRef = React.useRef<HTMLTextAreaElement>(null);
  const [inputValue, setInputValue] = React.useState<string>("“”");
  const [inputCursorPosition, setInputCursorPosition] =
    React.useState<number>(1);
  const [inputIsDone, setInputIsDone] = React.useState<boolean>(false);
  const [hasNewCursorPosition, setHasNewCursorPosition] =
    React.useState<boolean>(true);
  useAutosizeTextArea(inputRef.current, inputValue);

  const onInputVaueChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = event.target.value;
    const oldCursorPosition = inputRef.current?.selectionStart ?? 0;
    setInputCursorPosition(getCursorPosition(newValue, oldCursorPosition));
    setHasNewCursorPosition(true);
    const noInitialQuotes = newValue.replace("“", "");
    const noQuotes = noInitialQuotes.replace("”", "");
    setInputValue(`“${noQuotes}”`);
  };

  React.useEffect(() => {
    setInputIsDone(true);
  }, [inputValue]);

  React.useEffect(() => {
    if (inputIsDone && hasNewCursorPosition) {
      inputRef.current?.setSelectionRange(
        inputCursorPosition,
        inputCursorPosition
      );
      setHasNewCursorPosition(false);
      setInputIsDone(false);
    }
  }, [inputIsDone, hasNewCursorPosition, inputCursorPosition]);

  return isDismissed ? null : (
    <div
      key={key}
      className={styles.container}
      style={{ gridTemplateColumns: isDialogue ? "4fr 1fr 30px" : "1fr" }}
    >
      <textarea
        className={montse_cn(styles.mainInput)}
        onChange={onInputVaueChange}
        ref={inputRef}
        rows={1}
        value={inputValue}
      ></textarea>
      <div
        className={styles.speakerContainer}
        style={{ display: isDialogue ? undefined : "none" }}
      >
        <span className={styles.speakerLine}>-</span>
        <input
          className={styles.speaker}
          type={"text"}
          placeholder={"Speaker"}
        ></input>
      </div>
      {isDialogue ? (
        <div className={styles.dismissContainer}>
          <DismissButton
            size={16}
            weight={1}
            color="#a32424"
            onClick={() => {
              setIsDismissed(true);
            }}
          />
        </div>
      ) : undefined}
    </div>
  );
};
