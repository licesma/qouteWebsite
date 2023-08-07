import Image from "next/image";
import * as React from "react";
import { ChangePictureModal } from "./ChangePictureModal";
import styles from "./Persona.module.css";

export interface EditablePersonaProps {
  size: number;
  name?: string;
  imageLink?: string;
  updateImageCallback: (file: Blob) => void;
}

export const EditablePersona: React.FunctionComponent<EditablePersonaProps> = (
  props
) => {
  const { name, imageLink, updateImageCallback, size } = props;
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const initials = getNameInitials(name);

  const onEditClick = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <ChangePictureModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
        }}
        pictureSrc={imageLink}
        name={name}
        updatePictureCallback={updateImageCallback}
      />
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
        <div className={styles.filter} />
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
          <div className={styles.editTooltip}>
            {imageLink ? "Change picture" : "Add picture"}
          </div>
        </div>
      </div>
    </>
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
