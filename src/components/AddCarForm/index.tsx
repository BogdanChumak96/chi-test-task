import React, { ChangeEvent, useId, useState } from "react";
import "./styles.css";
import { IsAble } from "@utils/constants";
import { AddCarFormProps, IField } from "../../types";

const AddCarForm: React.FC<AddCarFormProps> = ({ onClose, onSave }) => {
  const [formData, setFormData] = useState({
    company: "",
    model: "",
    vin: "",
    year: "",
    color: "",
    price: "",
    availability: "true",
  });

  const [errorMessages, setErrorMessages] = useState({
    company: "",
    model: "",
    vin: "",
    year: "",
    color: "",
    price: "",
    availability: "",
  });

  const id = useId();

  const fields: IField[] = [
    {
      name: "company",
      label: "Company",
      value: formData.company,
      errorMessage: errorMessages.company,
    },
    {
      name: "model",
      label: "Model",
      value: formData.model,
      errorMessage: errorMessages.model,
    },
    {
      name: "vin",
      label: "VIN",
      value: formData.vin,
      errorMessage: errorMessages.vin,
    },
    {
      name: "year",
      label: "Year",
      value: formData.year,
      errorMessage: errorMessages.year,
    },
    {
      name: "color",
      label: "Color",
      value: formData.color,
      errorMessage: errorMessages.color,
    },
    {
      name: "price",
      label: "Price",
      value: formData.price,
      errorMessage: errorMessages.price,
    },
    {
      name: "availability",
      label: "Availability",
      value: formData.availability,
      errorMessage: errorMessages.availability,
      options: [
        { value: "true", label: IsAble.AVAILABLE },
        { value: "false", label: IsAble.NOTAVAILABLE },
      ],
    },
  ];

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSave = () => {
    const newErrorMessages = {
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
          : /^[a-zA-Z]+$/.test(formData.color)
          ? ""
          : "Color must consist of letters only",
      price:
        formData.price.trim() === ""
          ? "Please enter the price"
          : Number(formData.price) <= 0
          ? "Price must be greater than 0"
          : "",
      availability:
        formData.availability.trim() === "true" ||
        formData.availability.trim() === "false"
          ? ""
          : "Please select the availability",
    };

    setErrorMessages(newErrorMessages);

    if (Object.values(newErrorMessages).some((msg) => msg !== "")) {
      return;
    }

    onSave({
      ...formData,
      id,
    });

    onClose();
  };

  const renderedFields = fields.map((field) => (
    <div key={field.name}>
      <label>{field.label}</label>
      {field.options ? (
        <select
          name={field.name}
          value={field.value}
          onChange={handleInputChange}
        >
          {field.options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          type="text"
          name={field.name}
          value={field.value}
          onChange={handleInputChange}
        />
      )}
      {field.errorMessage && (
        <span className="error-message">{field.errorMessage}</span>
      )}
    </div>
  ));

  return (
    <div className="add-car-form">
      <h2>Add Car</h2>
      <div className="form">{renderedFields}</div>
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
