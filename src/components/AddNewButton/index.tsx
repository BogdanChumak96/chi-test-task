import React from "react";
import { ICar } from "../../types";
import { ModalVariants } from "@utils/constants";

interface AddNewCarButtonProps {
  handleOpenModal: (car: ICar | null, action: ModalVariants.ADD) => void;
  title: string;
}

const AddNewCarButton: React.FC<AddNewCarButtonProps> = React.memo(
  ({ handleOpenModal, title }) => {
    return (
      <button
        onClick={() => handleOpenModal(null, ModalVariants.ADD)}
        className="add-new"
      >
        {title}
      </button>
    );
  }
);

export default AddNewCarButton;
