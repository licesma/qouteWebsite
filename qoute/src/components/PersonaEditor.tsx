import styles from "./PersonaEditor.module.css";
import { ImageCropper } from "./ImageCropper";
import { Persona } from "./Persona";
import * as React from "react";

export interface PersonaEditorProps {
  size: number;
}

export const PersonaEditor: React.FunctionComponent<PersonaEditorProps> = (
  props
) => {
  const { size } = props;
  const [croppedPersona, setCroppedPersona] = React.useState<string>("");
  const [isEditOn, setIsEditOn] = React.useState<boolean>(false);
  const onCrop = (croppedLink: string) => {
    setCroppedPersona(croppedLink);
  };
  return (
    <div className={styles.container}>
      <Persona
        size={size / 2}
        name={"Esteban Martinez"}
        imageLink={croppedPersona}
        onEditClick={() => setIsEditOn(true)}
        isEditable={!isEditOn}
      />
      {isEditOn ? (
        <ImageCropper
          size={size / 2}
          onCrop={onCrop}
          onDismiss={() => setIsEditOn(false)}
        />
      ) : undefined}
    </div>
  );
};
