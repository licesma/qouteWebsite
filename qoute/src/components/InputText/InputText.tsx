import { Inter } from "@next/font/google";
import * as React from "react";
import styles from "./InputText.module.css";

const inter = Inter({ subsets: ["latin"] });

export interface InputTextProps {
  placeholder: string;
  onChange: (input: string) => void;
  onNotDefault?: () => void;
  onDefault?: () => void;
  width?: number;
  defaultValue?: string;
  onCurrent?: () => void;
}

export const InputText: React.FunctionComponent<InputTextProps> = (props) => {
  const {
    placeholder,
    onChange,
    defaultValue,
    width,
    onDefault,
    onNotDefault,
  } = props;
  const [inputValue, setInputValue] = React.useState<string>(
    defaultValue ?? ""
  );

  const onInputVaueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setInputValue(newValue);
    onChange(newValue);
    newValue === defaultValue
      ? onDefault && onDefault()
      : onNotDefault && onNotDefault();
  };

  React.useEffect(() => {
    defaultValue && setInputValue(defaultValue);
  }, [defaultValue]);

  return (
    <div className={styles.inputBox}>
      <input
        className={`${inter.className} ${styles.inputElement}`}
        defaultValue={defaultValue}
        type={"text"}
        style={getInputTextDynamicStyle(inputValue, width)}
        required={false}
        onChange={onInputVaueChange}
      />
      <div
        className={`${inter.className} ${styles.placeholder}`}
        style={getPlaceholderDynamicStyle(inputValue)}
      >
        {placeholder}
      </div>
    </div>
  );
};

export const getInputTextDynamicStyle = (value: string, width?: number) => {
  return {
    border: value ? "1px solid rgb(3, 152, 97)" : undefined,
    width: `${width}px`,
  };
};

export const getPlaceholderDynamicStyle = (value: string) => {
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
