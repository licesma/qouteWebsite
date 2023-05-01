import Cropper, { ReactCropperElement } from "react-cropper";
import "cropperjs/dist/cropper.css";
import { StandardButton } from "./StandardButton";
import styles from "./ImageCropper.module.css";
import * as React from "react";

const defaultSrc =
  "https://raw.githubusercontent.com/roadmanfong/react-cropper/master/example/img/child.jpg";
export interface ImageCropperProps {
  size: number;
  onCrop: (croppedLink: string) => void;
}

export const ImageCropper: React.FunctionComponent<ImageCropperProps> = (
  props
) => {
  const { size, onCrop } = props;
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [image, setImage] = React.useState(defaultSrc);
  const [cropData, setCropData] = React.useState("#");
  const cropperRef = React.createRef<ReactCropperElement>();
  const onChange = (e: any) => {
    e.preventDefault();
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
  };

  const getCropData = () => {
    if (typeof cropperRef.current?.cropper !== "undefined") {
      setCropData(cropperRef.current?.cropper.getCroppedCanvas().toDataURL());
      onCrop(cropperRef.current?.cropper.getCroppedCanvas().toDataURL());
    }
  };

  return (
    <div>
      <div className={styles.container}>
        <div className={styles.cropperContainer}>
          <Cropper
            ref={cropperRef}
            style={{ height: size, width: 2 * size, borderRadius: "10px" }}
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
        <input
          className={styles.inputFile}
          type="file"
          onChange={onChange}
          ref={inputRef}
          accept={"image/png, image/jpeg"}
        />
      </div>
      <div className={styles.buttonContainer}>
        <StandardButton
          text={"Browse"}
          fontSize={16}
          callback={() => {
            inputRef?.current?.click();
          }}
        />
        <StandardButton
          fontSize={16}
          text={"Crop Image"}
          callback={getCropData}
        />
      </div>
    </div>
  );
};
