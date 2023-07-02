import styles from "./Modal.module.css";
import * as React from "react";
import { ReactPortal } from "./ReactPortal";
import { DismissButton } from "@/components/DismissButton";

export interface ModalProps {
  isOpen: boolean;
  children?: JSX.Element;
  onClose: () => void;
}

export const Modal: React.FunctionComponent<ModalProps> = (props) => {
  const { children, isOpen, onClose } = props;

  return (
    <ReactPortal>
      <div className={styles.modal}>
        <div className={styles.modalFrame}>
          <div className={styles.dismissButton}>
            <DismissButton onClick={onClose} />
          </div>
          <div className={styles.modalContent}>{children}</div>
        </div>
      </div>
    </ReactPortal>
  );
};
