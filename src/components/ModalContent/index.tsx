import {
  carsSelectors,
  setAvailability,
  setCars,
  setColor,
  setModalAction,
  setOpenModal,
  setPrice,
  setSelectedCar,
} from "@store/carSlice";
import { ICar } from "../../types";
import { ModalVariants } from "@utils/constants";
import { useAppDispatch, useAppSelector } from "@utils/hooks";
import { AddCarForm, DeleteCarForm, EditCarForm } from "..";
import { RootState } from "@store/index";

const ModalContent: React.FC = () => {
  const dispatch = useAppDispatch();
  const selectSelectedCar = useAppSelector((state: RootState) =>
    carsSelectors.selectSelectedCar(state)
  );
  const selectColor = useAppSelector((state: RootState) =>
    carsSelectors.selectColor(state)
  );
  const selectPrice = useAppSelector((state: RootState) =>
    carsSelectors.selectPrice(state)
  );
  const selectAvailability = useAppSelector((state: RootState) =>
    carsSelectors.selectAvailability(state)
  );
  const selectAllCars = useAppSelector((state: RootState) =>
    carsSelectors.selectAllCars(state)
  );
  const isEditModalAction = useAppSelector(
    (state: RootState) =>
      carsSelectors.selectModalAction(state) === ModalVariants.EDIT
  );
  const isDeleteModalAction = useAppSelector(
    (state: RootState) =>
      carsSelectors.selectModalAction(state) === ModalVariants.DELETE
  );

  const handleCloseModal = () => {
    dispatch(setOpenModal(false));
    dispatch(setSelectedCar(null));
    dispatch(setModalAction(null));
  };

  const handleSaveCar = () => {
    if (selectSelectedCar !== null) {
      const updatedCar: ICar = {
        ...selectSelectedCar,
        car_color: selectColor,
        price: selectPrice,
        availability: selectAvailability,
      };

      const updatedCars = selectAllCars.map((car: ICar) =>
        car.id === updatedCar.id ? updatedCar : car
      );

      dispatch(setCars(updatedCars));
      handleCloseModal();
    }
  };

  const handleColorUpdate = (color: string) => {
    dispatch(setColor(color));
  };

  const handlePriceUpdate = (newPrice: string) => {
    dispatch(setPrice(`${newPrice}`));
  };

  const handleAvailabilityUpdate = (availability: boolean) => {
    dispatch(setAvailability(availability));
  };

  const handleDeleteCar = (car: ICar) => {
    const updatedCars = selectAllCars.filter((c: ICar) => c.id !== car.id);
    dispatch(setCars(updatedCars));
    handleCloseModal();
  };

  const handleAddCar = (newCar: ICar) => {
    const updatedCars = [newCar, ...selectAllCars];
    dispatch(setCars(updatedCars));

    handleCloseModal();
  };

  if (isEditModalAction && selectSelectedCar) {
    return (
      <EditCarForm
        color={selectColor}
        price={selectPrice}
        availability={selectAvailability}
        car={selectSelectedCar}
        onClose={handleCloseModal}
        onSave={handleSaveCar}
        setColor={handleColorUpdate}
        setPrice={handlePriceUpdate}
        setAvailability={handleAvailabilityUpdate}
      />
    );
  }

  if (isDeleteModalAction && selectSelectedCar) {
    return (
      <DeleteCarForm
        car={selectSelectedCar}
        onClose={handleCloseModal}
        onDelete={() => handleDeleteCar(selectSelectedCar)}
      />
    );
  }

  return <AddCarForm onClose={handleCloseModal} onSave={handleAddCar} />;
};

export default ModalContent;
