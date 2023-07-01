import { ChangeEvent, useState } from "react";
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
  const [colorError, setColorError] = useState(false);
  const [priceError, setPriceError] = useState(false);

  const handleColorChange = (e: ChangeEvent<HTMLInputElement>) => {
    const colorValue = e.target.value.trim();
  
    if (colorValue === "") {
      setColor("");
      setColorError(false);
    } else {
      const onlyLettersRegex = /^[a-zA-Z]+$/;
      const isValidColor = onlyLettersRegex.test(colorValue);
  
      if (isValidColor) {
        const capitalizedColor = colorValue.charAt(0).toUpperCase() + colorValue.slice(1);
        setColor(capitalizedColor);
        setColorError(false);
      } else {
        setColorError(true);
      }
    }
  };
  
  const isAvailability = availability ? "true" : "false";

  const handlePriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.trim();
  
    value = value.replace(/[^\d]/g, "");
  
    value = `$${value}`;
  
    setPrice(value);
    setPriceError(value.trim() === "");
  };
  

  const handleAvailabilityChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value === "true";
    setAvailability(value);
  };

  const handleSaveClick = () => {
    if (color.trim() === "" || price.trim() === "") {
      setColorError(color.trim() === "");
      setPriceError(price.trim() === "");
      return;
    }

    onSave();
  };

  return (
    <div className="edit-modal">
      <h2>Edit Car</h2>
      <div className="form">
        <div>
          <label>Company:</label>
          <input
            type="text"
            value={car.car}
            placeholder="Not Editable"
            disabled
            className="disabled"
          />
        </div>
        <div>
          <label>Model:</label>
          <input
            type="text"
            value={car.car_model}
            placeholder="Not Editable"
            disabled
            className="disabled"
          />
        </div>
        <div>
          <label>VIN:</label>
          <input
            type="text"
            value={car.car_vin}
            placeholder="Not Editable"
            disabled
            className="disabled"
          />
        </div>
        <div>
          <label>Year:</label>
          <input
            type="number"
            value={car.car_model_year}
            placeholder="Not Editable"
            disabled
            className="disabled"
          />
        </div>
        <div>
          <label>Color:</label>
          <input
            required
            type="text"
            value={color}
            onChange={handleColorChange}
          />
          {colorError && <span className="error-message">Color is required</span>}
        </div>
        <div>
          <label>Price:</label>
          <input
            required
            value={price}
            onChange={handlePriceChange}
          />
          {priceError && <span className="error-message">Price is required</span>}
        </div>
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
        <button className="save-button" onClick={handleSaveClick}>
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
