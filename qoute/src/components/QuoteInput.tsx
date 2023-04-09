import { QuoteData } from "@/types/QuoteData";
import { collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import * as React from "react";
import { useFirestore } from "./firebase/FirebaseProvider";
import { Overlay } from "./Overlay";
import styles from "./QuoteInput.module.css";
import { StandardButton } from "./StandardButton";

export interface QuoteInputProps {
  onHide: () => void;
}

export const QuoteInput: React.FunctionComponent<QuoteInputProps> = (props) => {
  const { onHide } = props;
  const firestore = useFirestore();

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
    const docRef = doc(firestore, "quotes", "yQ1QRTVFTNVPCtRRKICa");
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
    <Overlay onDismiss={onHide}>
      <div className={styles.generalContainer}>
        <form onSubmit={handleSubmit}>
          <div className={styles.formContainer}>
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
              <StandardButton
                text={"Add"}
                callback={onAddClick}
                fontSize={16}
              />
            </div>
          </div>
        </form>
      </div>
    </Overlay>
  );
};

const getOriginDynamicStyle = (value: string) => {
  return {
    border: value ? "1px solid rgb(3, 152, 97)" : undefined,
  };
};

const getHintAfterStyle = (value: string) => {
  return value
    ? {
        transform: "translateX(10px) translateY(-10px)",
        fontSize: "14px",
        padding: "0 10px",
        backgroundColor: "rgb(3, 152, 97)",
        color: "white",
        borderRadius: "12px",
      }
    : undefined;
};
