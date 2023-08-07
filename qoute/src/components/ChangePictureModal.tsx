import styles from "./ChangePictureModal.module.css";
import * as React from "react";
import { Modal } from "@/components/Modal";
import { StandardButton } from "./StandardButton";
import { ImageCropper } from "./ImageCropper";
import { Persona } from "./Persona";

export interface ChangePictureModalProps {
  isOpen: boolean;
  onClose: () => void;
  pictureSrc?: string;
  name?: string;
  updatePictureCallback: (file: Blob) => void;
}

export const ChangePictureModal: React.FunctionComponent<
  ChangePictureModalProps
> = (props) => {
  const { isOpen, onClose, pictureSrc, name, updatePictureCallback } = props;
  const [hasChanged, setHasChanged] = React.useState(false);
  const [isEditOn, setIsEditOn] = React.useState<boolean>(false);
  //Used to show the updated picture faster by overruling the pictureSrc parameter.
  const [forcePictureUrl, setForcePictureUrl] = React.useState<string>("");

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
    setForcePictureUrl(pictureUrl);
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
              updatePictureCallback={updatePictureCallback}
            />
          ) : (
            <>
              <h4>{hasChanged ? "Looking good!" : "Let's change that pic."}</h4>
              <div className={styles.elementContainer}>
                <Persona
                  size={200}
                  imageLink={forcePictureUrl ? forcePictureUrl : pictureSrc}
                  name={name}
                />
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
