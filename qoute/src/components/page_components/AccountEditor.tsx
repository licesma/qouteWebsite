import { Inter } from "@next/font/google";
import * as React from "react";
import { DatePicker } from "../DatePicker";
import styles from "./AccountEditor.module.css";
import { StandardButton } from "../StandardButton";
import { EditorElement } from "../EditorElement";
import { DateEditorElement } from "../DateEditorElement";
import { useAuth } from "../firebase/FirebaseProvider";
import { useCurrentUser } from "@/hooks/useCurrentUser";

const inter = Inter({ subsets: ["latin"] });

interface AccountEditorProps {}

export const AccountEditor: React.FunctionComponent<AccountEditorProps> = (
  props
) => {
  const { auth, updateUserName } = useAuth();
  const { displayName } = useCurrentUser();
  const onChange = (input: string) => {};

  React.useEffect(() => console.log(auth));

  const [nameValue, setNameValue] = React.useState<string>("");
  const [birthDateValue, setBirthDateValue] = React.useState<Date>(new Date());

  const onUserNameSave = (userName: string) => {
    setNameValue(userName);
    updateUserName(userName);
  };

  const onBirthDateSave = (date: Date) => {
    setBirthDateValue(date);
    //TODO: do api call
  };

  React.useEffect(() => {
    if (displayName) {
      setNameValue(displayName);
    }
  }, [displayName]);

  return (
    <div className={styles.container}>
      <EditorElement
        title={"Name"}
        currentValue={nameValue}
        onSave={onUserNameSave}
      />
      <DateEditorElement
        title={"Birth Date"}
        currentValue={birthDateValue}
        onSave={onBirthDateSave}
      />
      <h3 className={inter.className}>Birth Date</h3>
      <div className={styles.dateInput}>
        <DatePicker defaultValue={new Date()} />
      </div>
      <div className={styles.buttonContainer}>
        <StandardButton text={"Create Account"} callback={() => {}} />
      </div>
    </div>
  );
};
