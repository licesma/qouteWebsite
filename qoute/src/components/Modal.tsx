import { DismissButton } from "@/components/DismissButton";
import { inter_cn } from "@/components/fonts";
import * as React from "react";
import styles from "./Modal.module.css";
import { ReactPortal } from "./ReactPortal";

export interface ModalProps {
  isOpen: boolean;
  children?: JSX.Element;
  onClose: () => void;
  title: string;
  fullModal?: boolean;
}

export const Modal: React.FunctionComponent<ModalProps> = (props) => {
  const { children, isOpen, fullModal, onClose, title } = props;

  return (
    <ReactPortal>
      <div className={styles.modal}>
        <div
          className={styles.modalFrame}
          style={{ width: fullModal ? "50%" : undefined }}
        >
          <div className={styles.header}>
            <div className={inter_cn(styles.title)}>{title}</div>
            <div className={styles.dismissButton}>
              <DismissButton onClick={onClose} />
            </div>
          </div>
          <div className={styles.modalContent}>{children}</div>
        </div>
      </div>
    </ReactPortal>
  );
};
