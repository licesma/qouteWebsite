import styles from "./PersonaEditor.module.css";
import { ImageCropper } from "./ImageCropper";
import { Persona } from "./Persona";
import * as React from "react";

export interface PersonaEditorProps {
  size: number;
  name: string;
  imageLink?: string;
}

export const PersonaEditor: React.FunctionComponent<PersonaEditorProps> = (
  props
) => {
  const { imageLink, name, size } = props;
  const [croppedPersona, setCroppedPersona] = React.useState<string>("");
  const [isEditOn, setIsEditOn] = React.useState<boolean>(false);
  const [isPreviewOn, setIsPreviewOn] = React.useState<boolean>(false);
  const onCrop = (croppedLink: string) => {
    setCroppedPersona(croppedLink);
  };

  const onDismiss = () => {
    setIsEditOn(false);
    setIsPreviewOn(false);
  };

  const onSave = () => {
    setIsEditOn(false);
    setIsPreviewOn(true);
  };

  return (
    <div className={styles.container}>
      <Persona
        size={size / 2}
        name={name}
        imageLink={isPreviewOn ? croppedPersona : imageLink}
        onEditClick={() => setIsEditOn(true)}
        isEditable={!isEditOn}
      />
      {isEditOn ? (
        <ImageCropper
          size={size / 2}
          onCrop={onCrop}
          onDismiss={onDismiss}
          onPreview={() => setIsPreviewOn(true)}
          onSave={onSave}
        />
      ) : undefined}
    </div>
  );
};
