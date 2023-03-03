import { Inter } from "@next/font/google";
import styles from "./CreateButton.module.css";
const inter = Inter({ subsets: ["latin"], weight: "500" });

export interface CreateButtonProps {
  fullInput: boolean;
  callback: () => void;
}

export const CreateButton: React.FunctionComponent<CreateButtonProps> = (
  props
) => {
  const { callback, fullInput } = props;
  return (
    <a
      href="#"
      className={`${styles.neonButton} ${inter.className}`}
      onClick={callback}
      style={fullInput ? { visibility: "hidden" } : undefined}
    >
      Quick add
    </a>
  );
};
