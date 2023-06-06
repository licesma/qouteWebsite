import styles from "./EditButton.module.css";
import Image from "next/image";
import * as React from "react";

export interface EditButtonProps {
  onClick: () => void;
}

export const EditButton: React.FunctionComponent<EditButtonProps> = (props) => {
  const { onClick } = props;
  return (
    <>
      <Image
        className={styles.editButtonImage}
        alt={"ok"}
        width={25}
        height={25}
        src={"/edit_pencil.svg"}
        onClick={onClick}
      />
    </>
  );
};
