import { inter_cn } from "./fonts";
import styles from "./DateEditorElement.module.css";
import * as React from "react";
import { InputText } from "@/components/InputText/InputText";
import { EditButton } from "./EditButton";
import { StandardButton } from "./StandardButton";
import { DatePicker } from "./DatePicker";

export interface DateEditorElementProps {
  title: string;
  currentValue: Date;
  onSave: (newValue: Date) => void;
}

export const DateEditorElement: React.FunctionComponent<
  DateEditorElementProps
> = (props) => {
  const { currentValue, title, onSave } = props;
  const [isEditing, setIsEditing] = React.useState<boolean>(false);
  const [newValue, setNewValue] = React.useState<Date | undefined>(undefined);
  const [isSaveButtonActive, setIsSaveButtonActive] =
    React.useState<boolean>(false);

  React.useEffect(() => console.log(onSave));

  const onSaveClick = () => {
    newValue ? onSave(newValue) : undefined;
    setIsEditing(false);
  };
  return (
    <div className={styles.editorElementContainer}>
      <h2 className={inter_cn()}>{title}</h2>
      <div className={styles.generalContainer}>
        <DatePicker
          onChange={(date: Date) => setNewValue(date)}
          defaultValue={currentValue}
          onDefault={() => {
            setIsSaveButtonActive(false);
          }}
          onNotDefault={() => {
            setIsSaveButtonActive(true);
          }}
        />
        <div className={styles.actionButtonContainer}>
          {isEditing ? (
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
          ) : (
            <EditButton
              onClick={() => {
                setIsEditing(true);
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};
