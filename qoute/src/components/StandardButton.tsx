import { Open_Sans } from "@next/font/google";
import styles from "./StandardButton.module.css";
const open = Open_Sans({ subsets: ["latin"], weight: "400" });

export interface StandardButtonProps {
  text: string;
  callback: () => void;
  fontSize?: number;
  className?: string;
}

export const StandardButton: React.FunctionComponent<StandardButtonProps> = (
  props
) => {
  const { callback, className, text, fontSize } = props;
  const halfSize = Math.floor(fontSize ? fontSize / 2 : 0);
  return (
    <button
      className={`${className ? styles.className + " " : ""}${styles.button} ${
        open.className
      }`}
      style={
        fontSize
          ? {
              fontSize: `${fontSize}px`,
              padding: `${halfSize / 2}px ${halfSize}px`,
              borderRadius: `${fontSize / 2}px`,
            }
          : undefined
      }
      onClick={callback}
    >
      {text}
    </button>
  );
};
