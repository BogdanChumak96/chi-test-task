import React from "react";
import "./styles.css";

interface ICar {
  id: string;
  car: string;
  car_model: string;
  company: string;
  car_vin: string;
  car_model_year: number;
  car_color: string;
  price: number | string;
  availability: boolean;
  setCompany: (company: string) => void;
  setModel: (model: string) => void;
  setVin: (vin: string) => void;
  setYear: (year: number) => void;
  setColor: (color: string) => void;
  setPrice: (price: number | string) => void;
  setAvailability: (availability: boolean) => void;
}

interface DeleteCarFormProps {
  car: ICar | null;
  onClose: () => void;
  onDelete: () => void;
}

const DeleteCarForm: React.FC<DeleteCarFormProps> = ({ onClose, onDelete }) => {
  const handleDelete = () => {
    onDelete();
    onClose();
  };
  console.log("Delete a Car");

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
