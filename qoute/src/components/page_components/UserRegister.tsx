import { Inter } from "@next/font/google";
import { QuoteData } from "@/types/QuoteData";
import * as React from "react";
import { DatePicker } from "../DatePicker";
import { InputText } from "@/components/InputText/InputText";
import styles from "./UserRegister.module.css";
import { StandardButton } from "../StandardButton";

const inter = Inter({ subsets: ["latin"] });

interface UserRegisterProps {}

export const UserRegister: React.FunctionComponent<UserRegisterProps> = (
  props
) => {
  const onChange = (input: string) => {};

  return (
    <div className={styles.container}>
      <h1 className={inter.className}>Almost Done!</h1>
      <h2 className={inter.className}>
        Complete your account with the following fields to create your account.
      </h2>
      <div className={styles.userNameInput}>
        <InputText placeholder={"Given Name"} onChange={onChange} width={300} />

        <InputText placeholder={"Last Name"} onChange={onChange} width={300} />
      </div>
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
