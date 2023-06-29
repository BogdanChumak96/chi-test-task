import React, { ChangeEvent } from "react";
import "./styles.css";

interface AddCarFormProps {
  onClose: () => void;
  onSave: (car: any) => void;
}

const AddCarForm: React.FC<AddCarFormProps> = ({ onClose, onSave }) => {
  const [company, setCompany] = React.useState("");
  const [model, setModel] = React.useState("");
  const [vin, setVin] = React.useState("");
  const [year, setYear] = React.useState(0);
  const [color, setColor] = React.useState("");
  const [price, setPrice] = React.useState(0);
  const [availability, setAvailability] = React.useState("");
  console.log("Add new Car");

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
        setYear(Number(value));
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
    onSave({
      company,
      model,
      year,
      color,
      price,
      availability,
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
            value={company}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Model</label>
          <input
            type="text"
            name="model"
            value={model}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>VIN</label>
          <input
            type="text"
            name="vin"
            value={vin}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Year</label>
          <input
            type="number"
            name="year"
            value={year}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Color</label>
          <input
            type="text"
            name="color"
            value={color}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Price</label>
          <input
            type="number"
            name="price"
            value={price}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Availability</label>
          <select
            name="availability"
            value={availability}
            onChange={handleInputChange}
          >
            <option value="true">Available</option>
            <option value="false">Not Available</option>
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

export default AddCarForm;
