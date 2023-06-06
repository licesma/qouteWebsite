import { Inter } from "@next/font/google";
import * as React from "react";
import { DatePicker } from "../DatePicker";
import styles from "./AccountEditor.module.css";
import { StandardButton } from "../StandardButton";
import { EditorElement } from "../EditorElement";
import { useAuth } from "../firebase/FirebaseProvider";
import { useCurrentUser } from "@/hooks/useCurrentUser";

const inter = Inter({ subsets: ["latin"] });

interface AccountEditorProps {}

export const UserRegister: React.FunctionComponent<AccountEditorProps> = (
  props
) => {
  const { auth, updateUserName } = useAuth();
  const { displayName } = useCurrentUser();
  const onChange = (input: string) => {};

  React.useEffect(() => console.log(auth));

  const [nameValue, setNameValue] = React.useState<string>("");
  const [birthDayValue, setBirthDayValue] = React.useState<number>();
  const [birthMonthValue, setBirthMonthValue] = React.useState<number>();
  const [birthYearValue, setBirthYearValue] = React.useState<number>();

  const onUserNameSave = (userName: string) => {
    setNameValue(userName);
    updateUserName(userName);
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
      <h3 className={inter.className}>Birth Date</h3>
      <div className={styles.dateInput}>
        <DatePicker />
      </div>
      <div className={styles.buttonContainer}>
        <StandardButton text={"Create Account"} callback={() => {}} />
      </div>
    </div>
  );
};
