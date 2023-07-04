import React from "react";
import { ICar } from "../../types";
import { ModalVariants } from "@utils/constants";
import styles from "./styles.module.scss";

interface AddNewCarButtonProps {
  handleOpenModal: (car: ICar | null, action: ModalVariants.ADD) => void;
  title: string;
}

const AddNewCarButton: React.FC<AddNewCarButtonProps> = React.memo(
  ({ handleOpenModal, title }) => {
    return (
      <button
        onClick={() => handleOpenModal(null, ModalVariants.ADD)}
        className={styles.add_new}
      >
        {title}
      </button>
    );
  }
);

export default AddNewCarButton;
