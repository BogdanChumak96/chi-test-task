import React, { ChangeEvent, useState } from "react";
import styles from "./styles.module.scss";
import { IEditProps } from "../../types";
import { IsAble } from "@utils/constants";
import { schema } from "./schema";

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
  const [errors, setErrors] = useState<{ [key: string]: string }>({
    color: "",
    price: "",
  });

  const handleColorChange = (e: ChangeEvent<HTMLInputElement>) => {
    const colorValue = e.target.value;
    const capitalizedColor =
      colorValue.charAt(0).toUpperCase() + colorValue.slice(1);
    setColor(capitalizedColor);
  };

  const isAvailability = availability ? "true" : "false";

  const handlePriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (!value || value === "$") {
      setPrice("");
    } else if (!value.startsWith("$")) {
      setPrice(`$${value}`);
    } else {
      setPrice(value);
    }
  };

  const handleAvailabilityChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value === "true";
    setAvailability(value);
  };

  const validateField = async (fieldName: string, value: string) => {
    try {
      await schema.validateAt(fieldName, { [fieldName]: value });
      setErrors((prevErrors) => ({ ...prevErrors, [fieldName]: "" }));
    } catch (error: any) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [fieldName]: error.message,
      }));
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
      onBlur: () => validateField("color", color),
      editable: true,
    },
    {
      label: "Price:",
      value: price,
      onChange: handlePriceChange,
      onBlur: () => validateField("price", price),
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
      {inputElement.label === "Color:" && errors.color && (
        <span className={styles.error_message}>{errors.color}</span>
      )}
      {inputElement.label === "Price:" && errors.price && (
        <span className={styles.error_message}>{errors.price}</span>
      )}
    </div>
  ));

  const handleSave = () => {
    validateField("color", color);
    validateField("price", price);

    if (errors.color || errors.price || !color || !price || price === "$") {
      return;
    }

    onSave();
  };

  return (
    <div className={styles.edit_modal}>
      <h2>Edit Car</h2>
      <div className={styles.form}>
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
      <div className={styles.buttons}>
        <button className={styles.save_button} onClick={handleSave}>
          Save
        </button>
        <button className={styles.cancel_button} onClick={onClose}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default EditCarForm;
