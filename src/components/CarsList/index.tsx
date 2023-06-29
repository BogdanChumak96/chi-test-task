import CarItem from "@components/CarItem";
import { ICar } from "../../types/index";

interface Props {
  cars: ICar[];
  handleOpenModal: (car: ICar, action: "edit" | "delete") => void;
}

const CarsList: React.FC<Props> = ({ cars, handleOpenModal }) => {
  return (
    <>
      {cars.map((car: ICar) => (
        <CarItem key={car.id} car={car} handleOpenModal={handleOpenModal} />
      ))}
    </>
  );
};

export default CarsList;
