import { ChangeEvent, useId, useState } from "react";
import "./styles.css";
import * as Yup from "yup";
import { schema } from "./schema";
import { getInputs } from "@utils/helpers";
import { ErrorMessages } from "../../types";
import RenderedInputs from "@components/RenderedAddInputs";

export interface AddCarFormProps {
  onClose: () => void;
  onSave: (car: any) => void;
}

const AddCarForm: React.FC<AddCarFormProps> = ({ onClose, onSave }) => {
  const [formData, setFormData] = useState({
    company: "",
    model: "",
    vin: "",
    year: "",
    color: "",
    price: 0,
    availability: "true",
  });

  const [errorMessages, setErrorMessages] = useState<ErrorMessages>({
    company: "",
    model: "",
    vin: "",
    year: "",
    color: "",
    price: "",
    availability: "",
  });

  const id = useId();

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const validateForm = async () => {
    try {
      await schema.validate(formData, { abortEarly: false });
      setErrorMessages({} as ErrorMessages);
      return true;
    } catch (err: any) {
      const validationErrors: ErrorMessages = {
        company: "",
        model: "",
        vin: "",
        year: "",
        color: "",
        price: "",
        availability: "",
      };
      err.inner.forEach((error: Yup.ValidationError) => {
        validationErrors[error.path as keyof ErrorMessages] = error.message;
      });
      setErrorMessages(validationErrors);
      return false;
    }
  };

  const handleSave = async () => {
    if (!(await validateForm())) {
      return;
    }

    onSave({
      car: formData.company,
      car_model: formData.model,
      car_model_year: formData.year,
      car_color: formData.color,
      price: `$${formData.price}`,
      car_vin: formData.vin,
      availability: formData.availability,
      id,
    });
    onClose();
  };

  const inputs = getInputs(formData, errorMessages);

  return (
    <div className="add-car-form">
      <h2>Add Car</h2>
      <div className="form">
        <RenderedInputs inputs={inputs} handleInputChange={handleInputChange} />
      </div>
      <div className="buttons">
        <button className="save-button" onClick={handleSave}>
          Save
        </button>
        <button className="cancel-button" onClick={onClose}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default AddCarForm;
