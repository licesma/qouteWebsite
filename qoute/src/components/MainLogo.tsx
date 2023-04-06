import { Josefin_Sans } from "@next/font/google";
import Image from "next/image";
import styles from "./MainLogo.module.css";

const josefin = Josefin_Sans({ subsets: ["latin"], weight: "600" });

export interface MainLogoProps {}

export const MainLogo: React.FunctionComponent<MainLogoProps> = (props) => {
  return (
    <div className={styles.container}>
      <div className={`${styles.title} ${josefin.className}`}>Qoute</div>
      <div className={styles.subtitle}>Finite organs of the infinite mind</div>
    </div>
  );
};
