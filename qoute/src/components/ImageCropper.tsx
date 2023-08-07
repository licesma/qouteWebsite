import Cropper, { ReactCropperElement } from "react-cropper";
import "cropperjs/dist/cropper.css";
import { StandardButton } from "./StandardButton";
import styles from "./ImageCropper.module.css";
import * as React from "react";
import { useUpdateProfilePicture } from "@/components/firebase/Hook/ProfilePicture";

export interface ImageCropperProps {
  size: number;
  imageSrc: string;
  onDismiss: () => void;
  onSave: (imageUrl: string) => void;
  updatePictureCallback: (file: Blob) => void;
}

export const ImageCropper: React.FunctionComponent<ImageCropperProps> = (
  props
) => {
  const { size, onDismiss, onSave, imageSrc, updatePictureCallback } = props;
  const cropperRef = React.createRef<ReactCropperElement>();

  const onCrop = () => {
    const cropperCanvas = cropperRef.current?.cropper.getCroppedCanvas();
    if (typeof cropperCanvas !== "undefined") {
      const cropUrl = cropperRef.current?.cropper
        .getCroppedCanvas()
        .toDataURL();
      cropUrl &&
        cropperRef.current?.cropper.getCroppedCanvas().toBlob((file) => {
          file && updatePictureCallback(file);
          onSave(cropUrl);
        });
    }
  };

  return (
    <div>
      {imageSrc ? (
        <div className={styles.cropperMenu}>
          <div className={styles.container}>
            <div className={styles.cropperContainer}>
              <Cropper
                ref={cropperRef}
                style={{
                  height: size,
                  width: size,
                  borderRadius: "10px",
                  margin: "6px 0px",
                }}
                zoomTo={0.1}
                aspectRatio={1}
                preview={styles.imgPreview}
                src={imageSrc}
                dragMode={"move"}
                viewMode={1}
                scaleX={1}
                cropBoxMovable={false}
                cropBoxResizable={false}
                minCropBoxHeight={10}
                minCropBoxWidth={10}
                background={false}
                responsive={true}
                highlight={false}
                autoCropArea={1}
                checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
                guides={false}
                toggleDragModeOnDblclick={false}
                center={false}
                restore={false}
              />
            </div>
          </div>
          <div className={styles.buttonContainer} style={{ width: size }}>
            <div>
              <StandardButton
                className={styles.cropButton}
                fontSize={18}
                text={"Cancel"}
                callback={onDismiss}
              />
            </div>
            <div className={styles.saveButton}>
              <StandardButton
                className={styles.cropButton}
                fontSize={18}
                text={"Save"}
                callback={onCrop}
              />
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};
