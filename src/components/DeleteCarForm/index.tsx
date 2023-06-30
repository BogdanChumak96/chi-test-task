import React from "react";
import "./styles.css";
import { IDeleteCarFormProps } from "../../types";

const DeleteCarForm: React.FC<IDeleteCarFormProps> = ({
  onClose,
  onDelete,
}) => {
  const handleDelete = () => {
    onDelete();
    onClose();
  };

  return (
    <div className="delete-modal">
      <h2>Delete Car</h2>
      <p>Are you sure you want to delete this car?</p>
      <div className="buttons">
        <button className="delete-button" onClick={handleDelete}>
          Delete
        </button>
        <button className="cancel-button" onClick={onClose}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default DeleteCarForm;
