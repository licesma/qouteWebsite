import styles from "./Persona.module.css";
import Image from "next/image";
import * as React from "react";

export interface PersonaProps {
  name?: string;
  imageLink?: string;
  size: number;
}

export const Persona: React.FunctionComponent<PersonaProps> = (props) => {
  const { name, imageLink, size } = props;
  const initials = getNameInitials(name);
  return (
    <div
      className={styles.container}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        fontSize: `${(size - size / 10) / 2}px`,
      }}
    >
      {imageLink ? (
        <Image
          className={styles.container}
          alt={"ok"}
          width={size}
          height={size}
          src={"/gm_s.jpg"}
        />
      ) : (
        initials
      )}
    </div>
  );
};

const getNameInitials = (name?: string): string | undefined => {
  if (name) {
    if (name.length <= 2) {
      return name;
    }
    const names = name.split(" ");
    if (names.length > 1) {
      return `${names[0][0]}${names[1][0]}`;
    }
    return name?.substring(0, 2);
  }
  return undefined;
};
