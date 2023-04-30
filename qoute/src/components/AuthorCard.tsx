import { Inter, Montserrat } from "@next/font/google";
import styles from "./AuthorCard.module.css";
import Image from "next/image";
import * as React from "react";

const inter = Inter({ subsets: ["latin"] });
const montserrat = Montserrat({ subsets: ["latin"] });

export interface AuthorCardProps {}

export const AuthorCard: React.FunctionComponent<AuthorCardProps> = (props) => {
  return (
    <div className={styles.card}>
      <div className={styles.picture}>
        <Image
          className={styles.emailSentPicture}
          alt={"ok"}
          width={94}
          height={94}
          src={"/gm_s.jpg"}
        />
      </div>
      <div className={`${montserrat.className} ${styles.name}`}>
        Gabriel García Márquez
      </div>
      <div className={`${inter.className} ${styles.quotesLabel}`}>
        23 quotes
      </div>
      <div className={`${inter.className} ${styles.sourcesLabel}`}>
        5 sources
      </div>
    </div>
  );
};
