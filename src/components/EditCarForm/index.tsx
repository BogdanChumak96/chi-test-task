import { ChangeEvent } from "react";
import "./styles.css";

interface ICar {
  id: string;
  car: string;
  car_model: string;
  company: string;
  car_vin: string;
  car_model_year: number;
  car_color: string;
  price: string | number;
  availability: boolean;
}

interface IEditProps {
  car: ICar;
  color: string;
  price: string;
  availability: boolean;
  onClose: () => void;
  onSave: () => void;
  setColor: (color: string) => void;
  setPrice: (string: string) => void;
  setAvailability: (availability: boolean) => void;
}

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
  const handleColorChange = (e: ChangeEvent<HTMLInputElement>) => {
    const colorValue = e.target.value;
    const capitalizedColor =
      colorValue.charAt(0).toUpperCase() + colorValue.slice(1);
    setColor(capitalizedColor);
  };

  const handlePriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (!value.startsWith("$")) {
      setPrice(`$${value}`);
    } else {
      setPrice(value);
    }
  };

  const handleAvailabilityChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value === "true";
    setAvailability(value);
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
        </div>
        <div>
          <label>Price:</label>
          <input required value={price} onChange={handlePriceChange} />
        </div>
        <div>
          <label>Availability</label>
          <select
            name="availability"
            value={availability ? "true" : "false"}
            onChange={handleAvailabilityChange}
          >
            <option value="true">Available</option>
            <option value="false">Not Available</option>
          </select>
        </div>
      </div>
      <div className="buttons">
        <button className="save-button" onClick={onSave}>
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
