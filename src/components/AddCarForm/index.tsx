import React, { ChangeEvent, useId, useState } from "react";
import "./styles.css";
import { IsAble } from "@utils/constants";
import { AddCarFormProps } from "../../types";

const AddCarForm: React.FC<AddCarFormProps> = ({ onClose, onSave }) => {
  const [car, setCompany] = useState("");
  const [car_model, setModel] = useState("");
  const [car_vin, setVin] = useState("");
  const [car_model_year, setYear] = useState("");
  const [car_color, setColor] = useState("");
  const [price, setPrice] = useState(0);
  const [availability, setAvailability] = useState("true");
  const id = useId();

  const [errorMessages, setErrorMessages] = useState({
    company: "",
    model: "",
    vin: "",
    year: "",
    color: "",
    price: "",
    availability: "",
  });

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    switch (name) {
      case "company":
        setCompany(value);
        break;
      case "model":
        setModel(value);
        break;
      case "vin":
        setVin(value);
        break;
      case "year":
        setYear(value);
        break;
      case "color":
        setColor(value);
        break;
      case "price":
        setPrice(Number(value));
        break;
      case "availability":
        setAvailability(value);
        break;
      default:
        break;
    }
  };

  const handleSave = () => {
    const newErrorMessages = {
      company: "",
      model: "",
      vin: "",
      year: "",
      color: "",
      price: "",
      availability: "",
    };

    if (car.trim() === "") {
      newErrorMessages.company = "Please enter the company";
    }
    if (car_model.trim() === "") {
      newErrorMessages.model = "Please enter the model";
    }
    if (car_vin.trim() === "") {
      newErrorMessages.vin = "Please enter the VIN";
    } else if (car_vin.length < 8) {
      newErrorMessages.vin = "VIN must be at least 8 characters";
    }
    if (car_model_year === "") {
      newErrorMessages.year = "Please enter the year";
    } else if (car_model_year.length !== 4) {
      newErrorMessages.year = "Year must consist of 4 digits";
    }
    if (car_color.trim() === "") {
      newErrorMessages.color = "Please enter the color";
    } else if (!/^[a-zA-Z]+$/.test(car_color)) {
      newErrorMessages.color = "Color must consist of letters only";
    }
    if (price === 0) {
      newErrorMessages.price = "Please enter the price";
    } else if (price <= 0) {
      newErrorMessages.price = "Price must be greater than 0";
    }
    if (availability.trim() === "true" || availability.trim() === "false") {
      newErrorMessages.availability = "";
    } else {
      newErrorMessages.availability = "Please select the availability";
    }

    setErrorMessages(newErrorMessages);

    if (Object.values(newErrorMessages).some((msg) => msg !== "")) {
      return;
    }

    onSave({
      car,
      car_model,
      car_model_year,
      car_color,
      price: `$${price}`, // добавляем знак доллара перед значением прайса
      car_vin,
      availability,
      id,
    });
    onClose();
  };

  return (
    <div className="add-car-form">
      <h2>Add Car</h2>
      <div className="form">
        <div>
          <label>Company</label>
          <input
            type="text"
            name="company"
            value={car}
            onChange={handleInputChange}
          />
          {errorMessages.company && (
            <span className="error-message">{errorMessages.company}</span>
          )}
        </div>
        <div>
          <label>Model</label>
          <input
            type="text"
            name="model"
            value={car_model}
            onChange={handleInputChange}
          />
          {errorMessages.model && (
            <span className="error-message">{errorMessages.model}</span>
          )}
        </div>
        <div>
          <label>VIN</label>
          <input
            type="text"
            name="vin"
            value={car_vin}
            onChange={handleInputChange}
          />
          {errorMessages.vin && (
            <span className="error-message">{errorMessages.vin}</span>
          )}
        </div>
        <div>
          <label>Year</label>
          <input
            type="text"
            name="year"
            value={car_model_year}
            onChange={handleInputChange}
          />
          {errorMessages.year && (
            <span className="error-message">{errorMessages.year}</span>
          )}
        </div>
        <div>
          <label>Color</label>
          <input
            type="text"
            name="color"
            value={car_color}
            onChange={handleInputChange}
          />
          {errorMessages.color && (
            <span className="error-message">{errorMessages.color}</span>
          )}
        </div>
        <div>
          <label>Price</label>
          <input
            type="number"
            name="price"
            value={price}
            onChange={handleInputChange}
          />
          {errorMessages.price && (
            <span className="error-message">{errorMessages.price}</span>
          )}
        </div>
        <div>
          <label>Availability</label>
          <select
            name="availability"
            value={availability}
            onChange={handleInputChange}
          >
            <option value="true">{IsAble.AVAILABLE}</option>
            <option value="false">{IsAble.NOTAVAILABLE}</option>
          </select>
          {errorMessages.availability && (
            <span className="error-message">
              {errorMessages.availability}
            </span>
          )}
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

export default AddCarForm;
