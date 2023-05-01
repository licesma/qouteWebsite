import Cropper, { ReactCropperElement } from "react-cropper";
import "cropperjs/dist/cropper.css";
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
  const { size } = props;
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
    }
  };

  return (
    <div>
      <div style={{ width: "100%" }}>
        <input type="file" onChange={onChange} />
        <Cropper
          ref={cropperRef}
          style={{ height: size, width: size }}
          zoomTo={0.6}
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
      <div>
        <div
          className={styles.imgPreview}
          style={{ width: "50%", float: "right" }}
        >
          <h1>Preview</h1>
          <div
            className={styles.imgPreview}
            style={{ width: "100%", float: "left", height: "300px" }}
          />
        </div>
        <div
          className={styles.imgPreview}
          style={{ width: "50%", float: "right", height: "300px" }}
        >
          <h1>
            <span>Crop</span>
            <button style={{ float: "right" }} onClick={getCropData}>
              Crop Image
            </button>
          </h1>
          <img
            style={{ width: "300px", height: "300px", borderRadius: "50%" }}
            src={cropData}
            alt="cropped"
          />
        </div>
      </div>
      <br style={{ clear: "both" }} />
    </div>
  );
};
