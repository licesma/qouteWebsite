import styles from "./ChangeProfilePictureModal.module.css";
import * as React from "react";
import { ProfilePicture } from "@/components/ProfilePicture";
import { Modal } from "@/components/Modal";
import { StandardButton } from "./StandardButton";
import { ImageCropper } from "./ImageCropper";

export interface ChangeProfilePictureModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ChangeProfilePictureModal: React.FunctionComponent<
  ChangeProfilePictureModalProps
> = (props) => {
  const { isOpen, onClose } = props;
  const [hasChanged, setHasChanged] = React.useState(false);
  const [isEditOn, setIsEditOn] = React.useState<boolean>(false);
  const [newPictureUrl, setNewPictureUrl] = React.useState<string>("");

  const onImageLoadCallback = () => {
    setIsEditOn(true);
  };

  const { imageSrc, onClickCallback, inputElement } =
    useOnImageInput(onImageLoadCallback);

  const onDismiss = () => {
    setIsEditOn(false);
  };

  const onSave = (pictureUrl: string) => {
    setIsEditOn(false);
    setHasChanged(true);
    setNewPictureUrl(pictureUrl);
  };

  return isOpen ? (
    <Modal isOpen={isOpen} onClose={onClose}>
      <>
        <div className={styles.container}>
          {isEditOn && imageSrc ? (
            <ImageCropper
              size={200}
              onDismiss={onDismiss}
              onSave={onSave}
              imageSrc={imageSrc}
            />
          ) : (
            <>
              <h4>{hasChanged ? "Looking good!" : "Let's change that pic."}</h4>
              <div className={styles.elementContainer}>
                <ProfilePicture size={200} forceUrl={newPictureUrl} />
              </div>
              <div className={styles.elementContainer}>
                <StandardButton
                  text={"Upload a picture"}
                  fontSize={18}
                  callback={() => {
                    onClickCallback();
                  }}
                />
              </div>
            </>
          )}
        </div>
        {inputElement}
      </>
    </Modal>
  ) : null;
};

interface UseOnImageInput {
  imageSrc: string;
  onClickCallback: () => void;
  inputElement: JSX.Element;
}
const useOnImageInput = (onImageLoadCallback: () => void): UseOnImageInput => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [imageSrc, setImageSrc] = React.useState("");

  const onInputChange = (e: any) => {
    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    const reader = new FileReader();

    reader.onload = () => {
      setImageSrc(reader.result as any);
      onImageLoadCallback();
    };

    files[0] && reader.readAsDataURL(files[0]);
  };

  const onClickCallback = () => {
    inputRef?.current?.click();
  };

  const inputElement = (
    <input
      className={styles.inputFile}
      type="file"
      onChange={onInputChange}
      ref={inputRef}
      accept={"image/png, image/jpeg"}
    />
  );

  return {
    imageSrc,
    onClickCallback,
    inputElement,
  };
};
