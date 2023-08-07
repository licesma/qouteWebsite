import Image from "next/image";
import * as React from "react";
import styles from "./Persona.module.css";

export interface PersonaProps {
  size: number;
  name?: string;
  imageLink?: string;
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
      <div className={styles.content}>
        {imageLink ? (
          <>
            <Image
              className={styles.container}
              alt={name ?? "persona-picture"}
              width={size}
              height={size}
              src={imageLink}
            />
          </>
        ) : (
          initials
        )}
      </div>
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
