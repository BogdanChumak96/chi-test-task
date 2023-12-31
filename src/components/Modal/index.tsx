import React, { useEffect, useRef } from "react";
import { IModalProps } from "../../types";
import styles from "./styles.module.scss";

const Modal: React.FC<IModalProps> = ({ open, onClose, children }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [open, onClose]);

  if (!open) {
    return null;
  }

  return (
    <div className={styles.modal}>
      <div className={styles.modal_content} ref={modalRef}>
        {children}
      </div>
    </div>
  );
};

export default Modal;
