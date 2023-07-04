import CarItem from "@components/CarItem";
import { ICar, ICarList } from "../../types/index";
import NoResults from "@components/NoResults";

const CarsList: React.FC<ICarList> = ({ cars, handleOpenModal }) => {
  if (cars.length === 0) {
    return <NoResults />;
  }

  return (
    <>
      {cars.map((car: ICar) => (
        <CarItem key={car.id} car={car} handleOpenModal={handleOpenModal} />
      ))}
    </>
  );
};

export default CarsList;
