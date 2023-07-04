import React, { ChangeEvent, useState } from "react";
import "./styles.css";
import { IEditProps } from "../../types";
import { IsAble } from "@utils/constants";

const EditCarForm: React.FC<IEditProps> = ({
  car,
  onClose,
  onSave,
  setColor,
  setPrice,
  setAvailability,
  color,
  availability,
  price,
}) => {
  const [colorError, setColorError] = useState("");
  const [priceError, setPriceError] = useState("");

  const handleColorChange = (e: ChangeEvent<HTMLInputElement>) => {
    const colorValue = e.target.value;
    const capitalizedColor =
      colorValue.charAt(0).toUpperCase() + colorValue.slice(1);
    setColor(capitalizedColor);
    setColorError(""); 
  };

  const isAvailability = availability ? "true" : "false";

  const handlePriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (!value.startsWith("$")) {
      setPrice(`$${value}`);
    } else {
      setPrice(value);
    }
    setPriceError(""); // Clear price error message
  };

  const handleAvailabilityChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value === "true";
    setAvailability(value);
  };

  const validateColor = () => {
    if (!color.trim()) {
      setColorError("Please enter the color");
    } else {
      setColorError("");
    }
  };

  const validatePrice = () => {
    if (!price.trim()) {
      setPriceError("Please enter the price");
    } else {
      setPriceError("");
    }
  };

  const inputElements = [
    { label: "Company:", value: car.car, editable: false },
    { label: "Model:", value: car.car_model, editable: false },
    { label: "VIN:", value: car.car_vin, editable: false },
    { label: "Year:", value: car.car_model_year.toString(), editable: false },
    {
      label: "Color:",
      value: color,
      onChange: handleColorChange,
      onBlur: validateColor,
      editable: true,
    },
    {
      label: "Price:",
      value: price,
      onChange: handlePriceChange,
      onBlur: validatePrice,
      editable: true,
    },
  ];

  const renderedFields = inputElements.map((inputElement, index) => (
    <div key={index}>
      <label>{inputElement.label}</label>
      <input
        type="text"
        value={inputElement.value}
        onChange={inputElement.onChange}
        onBlur={inputElement.onBlur}
        disabled={!inputElement.editable}
        className={!inputElement.editable ? "disabled" : ""}
      />
      {inputElement.label === "Color:" && colorError && (
        <span className="error-message">{colorError}</span>
      )}
      {inputElement.label === "Price:" && priceError && (
        <span className="error-message">{priceError}</span>
      )}
    </div>
  ));

  const handleSave = () => {
    validateColor();
    validatePrice();

    if (colorError || priceError || !color || !price) {
      return;
    }

    onSave();
  };

  return (
    <div className="edit-modal">
      <h2>Edit Car</h2>
      <div className="form">
        {renderedFields}
        <div>
          <label>Availability</label>
          <select
            name="availability"
            value={isAvailability}
            onChange={handleAvailabilityChange}
          >
            <option value="true">{IsAble.AVAILABLE}</option>
            <option value="false">{IsAble.NOTAVAILABLE}</option>
          </select>
        </div>
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

export default EditCarForm;
