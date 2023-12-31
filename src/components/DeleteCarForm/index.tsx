import React from "react";
import styles from "./styles.module.scss";
import { ICar } from "../../types";

export interface IDeleteCarFormProps {
  car: ICar | null;
  onClose: () => void;
  onDelete: () => void;
}

const DeleteCarForm: React.FC<IDeleteCarFormProps> = ({
  onClose,
  onDelete,
}) => {
  const handleDelete = () => {
    onDelete();
    onClose();
  };

  return (
    <div className={styles.delete_modal}>
      <h2>Delete Car</h2>
      <p>Are you sure you want to delete this car?</p>
      <div className={styles.buttons}>
        <button className={styles.delete_button} onClick={handleDelete}>
          Delete
        </button>
        <button className={styles.cancel_button} onClick={onClose}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default DeleteCarForm;
