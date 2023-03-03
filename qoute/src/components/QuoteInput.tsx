import { DismissButton } from "@/components/DismissButton";
import { QuoteData } from "@/types/QuoteData";
import { timeStamp } from "console";
import { collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import * as React from "react";
import { useEffect, useState } from "react";
import { firestore } from "./../app/firebase";
import styles from "./QuoteInput.module.css";

export interface QuoteInputProps {
  show: boolean;
  onHide: () => void;
}

export const QuoteInput: React.FunctionComponent<QuoteInputProps> = (props) => {
  const { show, onHide } = props;
  const resetInputFields = () => {
    setQuoteInput("");
    setAuthorInput("");
    setOriginInput("");
  };

  const [quoteInput, setQuoteInput] = React.useState<string>("");
  const [authorInput, setAuthorInput] = React.useState<string>("");
  const [originInput, setOriginInput] = React.useState<string>("");

  const onQuoteChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setQuoteInput(event.target.value);
  };

  const onAuthorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAuthorInput(event.target.value);
  };

  const onOriginChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOriginInput(event.target.value);
  };

  const onAddClick = () => {
    const docRef = doc(firestore, "quotes", "all_quotes");
    const data: QuoteData = {
      quote: quoteInput,
      author: authorInput,
      source: originInput,
    };
    const str = "43432kjldf" + Date.now().toString();
    setDoc(docRef, { [str]: data }, { merge: true });

    resetInputFields();
    onHide();
  };

  const handleSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.target.reset();
    (document.activeElement as HTMLElement).blur();
  };

  React.useEffect(() => console.log(authorInput));
  return (
    <div className={styles.generalContainer}>
      <form onSubmit={handleSubmit}>
        <div
          className={styles.formContainer}
          style={{
            height: show ? "384px" : undefined,
            width: show ? "1000px" : undefined,
          }}
        >
          <div className={styles.container}>
            <div className={styles.inputBox}>
              <textarea
                className={styles.quoteInput}
                required={true}
                onChange={onQuoteChange}
                rows={3}
              ></textarea>
              <div className={styles.hint}>Quote</div>
            </div>
            <div className={styles.inputBox}>
              <input
                className={styles.infoInput}
                type={"text"}
                style={getOriginDynamicStyle(authorInput)}
                required={false}
                onChange={onAuthorChange}
              />
              <div
                className={styles.hint}
                style={getHintAfterStyle(authorInput)}
              >
                Author
              </div>
            </div>

            <div className={styles.inputBox}>
              <input
                className={styles.infoInput}
                type={"text"}
                style={getOriginDynamicStyle(originInput)}
                required={false}
                onChange={onOriginChange}
              />
              <div
                className={styles.hint}
                style={getHintAfterStyle(originInput)}
              >
                Origin
              </div>
            </div>
          </div>
          <div className={styles.buttonContainer}>
            <button
              type={"submit"}
              className={styles.addButton}
              onClick={onAddClick}
              style={{
                backgroundColor: quoteInput
                  ? "rgba(74, 135, 191, 0.85)"
                  : undefined,
                border: quoteInput ? "2px solid rgb(38 81 120)" : undefined,
              }}
            >
              Add
            </button>
          </div>
        </div>
      </form>
      <div
        className={styles.dismissButtonContainer}
        style={{
          display: show ? undefined : "none",
        }}
      >
        <DismissButton onClick={onHide} />
      </div>
    </div>
  );
};

const getOriginDynamicStyle = (value: string) => {
  return {
    border: value ? "1px solid rgb(46, 95, 141)" : undefined,
  };
};

const getHintAfterStyle = (value: string) => {
  return value
    ? {
        transform: "translateX(10px) translateY(-10px)",
        fontSize: "20px",
        padding: "0 10px",
        backgroundColor: "rgb(74, 135, 191)",
        color: "black",
        borderRadius: "12px",
      }
    : undefined;
};
