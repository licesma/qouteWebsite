import Cropper, { ReactCropperElement } from "react-cropper";
import "cropperjs/dist/cropper.css";
import Image from "next/image";
import { StandardButton } from "./StandardButton";
import styles from "./ImageCropper.module.css";
import * as React from "react";
import { DismissButton } from "./DismissButton";
import { useProfilePicture } from "@/components/firebase/Hook/ProfilePicture";

const defaultSrc =
  "https://raw.githubusercontent.com/roadmanfong/react-cropper/master/example/img/child.jpg";
export interface ImageCropperProps {
  size: number;
  onCrop: (croppedLink: string) => void;
  onDismiss: () => void;
}

export const ImageCropper: React.FunctionComponent<ImageCropperProps> = (
  props
) => {
  const { size, onCrop, onDismiss } = props;
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [image, setImage] = React.useState("");
  const [file, setFile] = React.useState<Blob | undefined>(undefined);
  const { setProfilePictureCallback } = useProfilePicture();
  const [cropData, setCropData] = React.useState("#");
  const [isDragging, setIsDragging] = React.useState(false);
  const cropperRef = React.createRef<ReactCropperElement>();
  const cropperWidth = Math.floor((3 * size) / 2);
  const cropperHeight = size;
  const onChange = (e: any) => {
    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
      setFile(e.dataTransfer.files[0]);
    } else if (e.target) {
      files = e.target.files;
      setFile(e.target.files[0]);
    }
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result as any);
    };
    reader.readAsDataURL(files[0]);
  };

  const onDragOver = (e: any) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = (e: any) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const onDrop = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      let files;
      if (e.dataTransfer) {
        files = e.dataTransfer.files;
      } else if (e.target) {
        files = e.target.files;
      }
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result as any);
      };
      reader.readAsDataURL(files[0]);
    }
  };

  const getCropFunction = (save: boolean) => () => {
    const cropperCanvas = cropperRef.current?.cropper.getCroppedCanvas();
    if (typeof cropperCanvas !== "undefined") {
      const cropUrl = cropperCanvas.toDataURL();
      setCropData(cropUrl);
      onCrop(cropUrl);
      if (save) {
        cropperRef.current?.cropper.getCroppedCanvas().toBlob((file) => {
          setProfilePictureCallback &&
            file &&
            setProfilePictureCallback(file, cropUrl);
          onDismiss();
        });
      }
    }
  };

  return (
    <div>
      {!image ? (
        <div className={styles.cropperMenu}>
          <div
            className={styles.buttonContainer}
            style={{ width: cropperWidth }}
          >
            <div className={styles.cropButton}>
              <DismissButton onClick={onDismiss} />
            </div>
          </div>
          <div
            className={styles.browsePlaceholder}
            onDrop={onDrop}
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            onClick={() => {
              inputRef?.current?.click();
            }}
            style={{
              width: cropperWidth,
              height: cropperHeight,
              margin: "6px 0px",
              alignItems: "center",
              border: isDragging ? "3px dashed #505050" : undefined,
            }}
          >
            <div
              className={styles.imageIconContainer}
              style={{ display: isDragging ? "none" : undefined }}
            >
              <Image
                className={styles.editButtonImage}
                alt={"ok"}
                width={80}
                height={80}
                src={"/image_picker.svg"}
              />
            </div>
            <div
              className={styles.imagePickerLabel}
              style={
                isDragging
                  ? { fontWeight: "700", color: "#505050", fontSize: "16px" }
                  : undefined
              }
            >
              Drop image here
              <span
                className={styles.browseLabel}
                style={{ display: isDragging ? "none" : undefined }}
              >
                {" "}
                or Browse
              </span>
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.cropperMenu}>
          <div
            className={styles.buttonContainer}
            style={{ width: cropperWidth }}
          >
            <StandardButton
              text={"Browse other image"}
              fontSize={16}
              callback={() => {
                inputRef?.current?.click();
              }}
            />
            <div className={styles.cropButton}>
              <DismissButton onClick={onDismiss} />
            </div>
          </div>

          <div className={styles.container}>
            <div className={styles.cropperContainer}>
              <Cropper
                ref={cropperRef}
                style={{
                  height: cropperHeight,
                  width: cropperWidth,
                  borderRadius: "10px",
                  margin: "6px 0px",
                }}
                zoomTo={0.1}
                aspectRatio={1}
                preview={styles.imgPreview}
                src={image}
                viewMode={1}
                scaleX={1}
                cropBoxResizable={false}
                minCropBoxHeight={10}
                minCropBoxWidth={10}
                background={false}
                responsive={true}
                autoCropArea={1}
                checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
                guides={true}
              />
            </div>
          </div>
          <div
            className={styles.buttonContainer}
            style={{ width: cropperWidth }}
          >
            {" "}
            <StandardButton
              className={styles.cropButton}
              fontSize={16}
              text={"Preview"}
              callback={getCropFunction(false)}
            />
            <div className={styles.cropButton}>
              <StandardButton
                className={styles.cropButton}
                fontSize={16}
                text={"Save"}
                callback={getCropFunction(true)}
              />
            </div>
          </div>
        </div>
      )}
      <input
        className={styles.inputFile}
        type="file"
        onChange={onChange}
        ref={inputRef}
        accept={"image/png, image/jpeg"}
      />
    </div>
  );
};
