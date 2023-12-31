import React from "react";
import { IsAble, ModalVariants } from "@utils/constants";
import { ICarItem } from "../../types/index";
import { FiSettings } from "react-icons/fi";
import styles from "./styles.module.scss";

const CarItem: React.FC<ICarItem> = React.memo(({ car, handleOpenModal }) => {
  const isAbleText = car.availability ? IsAble.AVAILABLE : IsAble.NOTAVAILABLE;

  return (
    <tr key={car.id}>
      <td>{car.car}</td>
      <td>{car.car_model}</td>
      <td>{car.car_vin}</td>
      <td>{car.car_color}</td>
      <td>{car.car_model_year}</td>
      <td>{car.price}</td>
      <td>{isAbleText}</td>
      <td>
        <div className={styles.dropdown}>
          <div className={styles.action_button}>
            <FiSettings />
          </div>
          <div className={styles.dropdown_content}>
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
});

export default CarItem;
