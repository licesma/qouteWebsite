import { inter_cn } from "./fonts";
import styles from "./EditorElement.module.css";
import * as React from "react";
import { InputText } from "@/components/InputText/InputText";
import { EditButton } from "./EditButton";
import { StandardButton } from "./StandardButton";

export interface EditorElementProps {
  title: string;
  currentValue: string;
  onSave: (newValue: string) => void;
}

export const EditorElement: React.FunctionComponent<EditorElementProps> = (
  props
) => {
  const { currentValue, title, onSave } = props;
  const [isEditing, setIsEditing] = React.useState<boolean>(false);
  const [newValue, setNewValue] = React.useState<string>("");
  const [isSaveButtonActive, setIsSaveButtonActive] =
    React.useState<boolean>(false);

  React.useEffect(() => console.log(onSave));

  const onSaveClick = () => {
    onSave(newValue);
    setIsEditing(false);
  };
  return isEditing ? (
    <div>
      <div className={styles.editorEditElementContainer}>
        <InputText
          placeholder={title}
          onChange={(value: string) => {
            setNewValue(value);
          }}
          defaultValue={currentValue}
          onDefault={() => {
            setIsSaveButtonActive(false);
          }}
          onNotDefault={() => {
            setIsSaveButtonActive(true);
          }}
        />
        <div className={styles.controlButtonsContainer}>
          <div className={styles.controlButtons}>
            <StandardButton
              text={"Cancel"}
              callback={() => {
                setIsEditing(false);
              }}
              fontSize={16}
              isCancel
            />
            <StandardButton
              text={"Save"}
              callback={onSaveClick}
              fontSize={16}
              isDisabled={!isSaveButtonActive}
            />
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className={styles.editorElementContainer}>
      <h2 className={inter_cn()}>{title}</h2>
      <div className={styles.valueContainer}>
        <div className={inter_cn()}>{currentValue}</div>
        <EditButton
          onClick={() => {
            setIsEditing(true);
          }}
        />
      </div>
    </div>
  );
};
