import { Open_Sans } from "@next/font/google";
import styles from "./StandardButton.module.css";
const open = Open_Sans({ subsets: ["latin"], weight: "400" });

export interface StandardButtonProps {
  text: string;
  callback: () => void;
  fontSize?: number;
}

export const StandardButton: React.FunctionComponent<StandardButtonProps> = (
  props
) => {
  const { callback, text, fontSize } = props;
  return (
    <button
      className={`${styles.button} ${open.className}`}
      style={{ fontSize: `${fontSize}px` }}
      onClick={callback}
    >
      {text}
    </button>
  );
};
