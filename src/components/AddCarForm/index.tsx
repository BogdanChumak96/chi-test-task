import React, { ChangeEvent, useId, useState } from "react";
import "./styles.css";
import { IsAble } from "@utils/constants";
import { AddCarFormProps } from "../../types";

interface ErrorMessages {
  company: string;
  model: string;
  vin: string;
  year: string;
  color: string;
  price: string;
  availability: string;
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

  const validateForm = () => {
    const newErrorMessages: ErrorMessages = {
      company: formData.company.trim() === "" ? "Please enter the company" : "",
      model: formData.model.trim() === "" ? "Please enter the model" : "",
      vin:
        formData.vin.trim() === ""
          ? "Please enter the VIN"
          : formData.vin.length < 8
          ? "VIN must be at least 8 characters"
          : "",
      year:
        formData.year === ""
          ? "Please enter the year"
          : formData.year.length !== 4
          ? "Year must consist of 4 digits"
          : "",
      color:
        formData.color.trim() === ""
          ? "Please enter the color"
          : !/^[a-zA-Z]+$/.test(formData.color)
          ? "Color must consist of letters only"
          : "",
      price:
        formData.price === 0
          ? "Please enter the price"
          : formData.price <= 0
          ? "Price must be greater than 0"
          : "",
      availability:
        formData.availability.trim() !== "true" &&
        formData.availability.trim() !== "false"
          ? "Please select the availability"
          : "",
    };

    setErrorMessages(newErrorMessages);

    return Object.values(newErrorMessages).every((msg) => msg === "");
  };

  const handleSave = () => {
    if (!validateForm()) {
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

  const inputs = [
    {
      label: "Company",
      name: "company",
      value: formData.company,
      errorMessage: errorMessages.company,
    },
    {
      label: "Model",
      name: "model",
      value: formData.model,
      errorMessage: errorMessages.model,
    },
    {
      label: "VIN",
      name: "vin",
      value: formData.vin,
      errorMessage: errorMessages.vin,
    },
    {
      label: "Year",
      name: "year",
      value: formData.year,
      errorMessage: errorMessages.year,
    },
    {
      label: "Color",
      name: "color",
      value: formData.color,
      errorMessage: errorMessages.color,
    },
    {
      label: "Price",
      name: "price",
      value: formData.price.toString(),
      errorMessage: errorMessages.price,
    },
    {
      label: "Availability",
      name: "availability",
      value: formData.availability,
      errorMessage: errorMessages.availability,
      options: [
        { value: "true", label: IsAble.AVAILABLE },
        { value: "false", label: IsAble.NOTAVAILABLE },
      ],
    },
  ];

  const renderedInputs = inputs.map((input) => (
    <div key={input.name}>
      <label>{input.label}</label>
      {input.name === "availability" ? (
        <select
          name={input.name}
          value={input.value}
          onChange={handleInputChange}
        >
          {input.options?.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          type="text"
          name={input.name}
          value={input.value}
          onChange={handleInputChange}
        />
      )}
      {input.errorMessage && (
        <span className="error-message">{input.errorMessage}</span>
      )}
    </div>
  ));

  return (
    <div className="add-car-form">
      <h2>Add Car</h2>
      <div className="form">{renderedInputs}</div>
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
