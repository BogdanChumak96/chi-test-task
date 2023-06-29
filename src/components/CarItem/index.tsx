import { ModalVariants } from "@utils/constants";
import { ICar } from "../../types/index";
import { FiSettings } from "react-icons/fi";

interface Props {
  car: ICar;
  handleOpenModal: (car: ICar, action: "edit" | "delete") => void;
}

const CarItem: React.FC<Props> = ({ car, handleOpenModal }) => {
  return (
    <tr key={car.id}>
      <td>{car.car}</td>
      <td>{car.car_model}</td>
      <td>{car.car_vin}</td>
      <td>{car.car_color}</td>
      <td>{car.car_model_year}</td>
      <td>{car.price}</td>
      <td>{car.availability ? "Available" : "Not Available"}</td>
      <td>
        <div className="dropdown">
          <div className="action-button">
            <FiSettings />
          </div>
          <div className="dropdown-content">
            <button onClick={() => handleOpenModal(car, ModalVariants.EDIT)}>
              Edit
            </button>
            <button onClick={() => handleOpenModal(car, ModalVariants.DELETE)}>
              Delete
            </button>
          </div>
        </div>
      </td>
    </tr>
  );
};

export default CarItem;
