import * as React from "react";

export const OPEN_QUOTE = "“";
export const CLOSE_QUOTE = "”";

export const getQuoteCharsBeforeCursorPosition = (
  inputText: string,
  cursorPosition: number
) => {
  // The cursor position must be between [0, inputText.lenght]
  // It can be equal to the lenght because the user might have inputed the last character,
  // So the cursor must be after it.
  const length = inputText.length;
  if (cursorPosition < 0 || length < cursorPosition) return 0;
  let count = 0;
  for (let i = 0; i < cursorPosition; i++) {
    if (inputText[i] == OPEN_QUOTE || inputText[i] == CLOSE_QUOTE) {
      count++;
    }
  }
  console.log("couint", count);
  return count;
};

export const getCursorPosition = (inputText: string, oldPosition: number) => {
  const length = inputText.length;
  if (oldPosition == 0) {
    return 1;
  }
  const quotesBefore = getQuoteCharsBeforeCursorPosition(
    inputText,
    oldPosition
  );
  return oldPosition - quotesBefore + 1;
};

export const useAutosizeTextArea = (
  textAreaRef: HTMLTextAreaElement | null,
  value: string
) => {
  React.useEffect(() => {
    if (textAreaRef) {
      // We need to reset the height momentarily to get the correct scrollHeight for the textarea
      textAreaRef.style.height = "0px";
      const scrollHeight = textAreaRef.scrollHeight;

      // We then set the height directly, outside of the render loop
      // Trying to set this with state or a ref will product an incorrect value.
      textAreaRef.style.height = scrollHeight + "px";
    }
  }, [textAreaRef, value]);
};
