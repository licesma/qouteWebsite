import { Open_Sans } from "@next/font/google";
import styles from "./StandardButton.module.css";
const open = Open_Sans({ subsets: ["latin"], weight: "400" });

export interface StandardButtonProps {
  text: string;
  callback: () => void;
  fontSize?: number;
  isDisabled?: boolean;
  isCancel?: boolean;
  className?: string;
}

export const StandardButton: React.FunctionComponent<StandardButtonProps> = (
  props
) => {
  const { callback, className, text, fontSize, isCancel, isDisabled } = props;
  const halfSize = Math.floor(fontSize ? fontSize / 2 : 0);
  return (
    <button
      className={`${className ? styles.className + " " : ""}${styles.button} ${
        open.className
      }`}
      style={{
        fontSize: fontSize ? `${fontSize}px` : undefined,
        padding: fontSize ? `${halfSize / 4}px ${halfSize}px` : undefined,
        borderRadius: fontSize ? `${fontSize / 4}px` : undefined,
        backgroundColor: isDisabled || isCancel ? "#969696" : undefined,
        color: isDisabled ? "#505050" : isCancel ? "black" : undefined,
      }}
      onClick={callback}
    >
      {text}
    </button>
  );
};
