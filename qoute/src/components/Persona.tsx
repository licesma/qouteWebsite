import styles from "./Persona.module.css";
import Image from "next/image";
import * as React from "react";

export interface PersonaProps {
  size: number;
  name?: string;
  imageLink?: string;
  isEditable?: boolean;
  onEditClick?: () => void;
}

export const Persona: React.FunctionComponent<PersonaProps> = (props) => {
  const { name, imageLink, size, onEditClick, isEditable } = props;
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
          <Image
            className={styles.container}
            alt={name ?? "profile-picture"}
            width={size}
            height={size}
            src={imageLink}
          />
        ) : (
          initials
        )}
      </div>
      {isEditable ? (
        <div
          className={styles.editGrid}
          style={{
            width: `${size}px`,
            height: `${size}px`,
          }}
        >
          <div className={styles.editButton} onClick={onEditClick} />

          <Image
            className={styles.editButtonImage}
            alt={"ok"}
            width={25}
            height={25}
            src={"/edit_pencil.svg"}
            onClick={onEditClick}
          />
          <div className={styles.editTooltip}>Change picture</div>
        </div>
      ) : undefined}
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
