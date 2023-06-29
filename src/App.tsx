import { useEffect, ChangeEvent } from "react";
import { useGetCarsQuery } from "@store/api";
import { ICar } from "./types";
import "./App.css";
import { debounce, filterCars } from "@utils/helpers";
import {
  EditCarForm,
  CarsList,
  DeleteCarForm,
  Modal,
  ErrorLoading,
  Loader,
  TableHeader,
  Header,
  Pagination,
  AddCarForm,
} from "./components";
import { ModalVariants } from "@utils/constants";
import { useAppDispatch, useAppSelector } from "@utils/hooks";
import {
  carsSelectors,
  setCurrentPage,
  setOpenModal,
  setCars,
  setSelectedCar,
  setModalAction,
  setColor,
  setPrice,
  setAvailability,
  setSearchText,
  setDebouncedSearchText,
} from "@store/carSlice";

const App = () => {
  const dispatch = useAppDispatch();
  const currentPage = useAppSelector(carsSelectors.selectCurrentPage);
  const selectOpenModal = useAppSelector(carsSelectors.selectOpenModal);
  const selectAllCars = useAppSelector(carsSelectors.selectAllCars);
  const selectSelectedCar = useAppSelector(carsSelectors.selectSelectedCar);
  const selectModalAction = useAppSelector(carsSelectors.selectModalAction);
  const selectColor = useAppSelector(carsSelectors.selectColor);
  const selectPrice = useAppSelector(carsSelectors.selectPrice);
  const selectAvailability = useAppSelector(carsSelectors.selectAvailability);
  const selectSearchText = useAppSelector(carsSelectors.selectSearchText);
  const selectDebouncedSearchText = useAppSelector(
    carsSelectors.selectDebouncedSearchText
  );
  console.log(selectAvailability);

  const { data, isLoading, isError, isSuccess } = useGetCarsQuery(
    {},
    { refetchOnMountOrArgChange: false }
  );

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchText(e.target.value));
    dispatch(setCurrentPage(1));
  };

  const isEditModalAction = selectModalAction === ModalVariants.EDIT;
  const isDeleteModalAction = selectModalAction === ModalVariants.DELETE;

  const handleOpenModal = (car: ICar, action: "edit" | "delete" | "add") => {
    dispatch(setSelectedCar(car));
    dispatch(setOpenModal(true));
    dispatch(setModalAction(action));
  };

  const handleCloseModal = () => {
    dispatch(setOpenModal(false));
    dispatch(setSelectedCar(null));
    dispatch(setModalAction(null));
  };

  const handleColorUpdate = (color: string) => {
    dispatch(setColor(color));
  };

  const handlePriceUpdate = (newPrice: string) => {
    dispatch(setPrice(newPrice));
  };

  const handleAvailabilityUpdate = (availability: boolean) => {
    dispatch(setAvailability(availability));
  };

  const handleSaveCar = () => {
    if (selectSelectedCar) {
      const updatedCar: ICar = {
        ...selectSelectedCar,
        car_color: selectColor,
        price: selectPrice,
        availability: selectAvailability,
      };
      console.log(updatedCar);

      const updatedCars = selectAllCars.map((car: ICar) =>
        car.id === updatedCar.id ? updatedCar : car
      );

      dispatch(setCars(updatedCars));
      // dispatch(setColor(""));
      // dispatch(setPrice(""));
      // dispatch(setAvailability(""));
      handleCloseModal();
    }
  };

  const handleDeleteCar = (car: ICar) => {
    const updatedCars = selectAllCars.filter((c: ICar) => c.id !== car.id);
    dispatch(setCars(updatedCars));
    handleCloseModal();
  };

  const handleAddCar = (newCar: ICar) => {
    const updatedCars = [newCar, ...selectAllCars];
    setCars(updatedCars);
    handleCloseModal();
  };

  useEffect(() => {
    const debouncedSearch = debounce(() => {
      dispatch(setDebouncedSearchText(selectSearchText));
    }, 500);
    debouncedSearch();
    dispatch(setCurrentPage(1));
  }, [selectSearchText, dispatch]);

  useEffect(() => {
    if (isSuccess) {
      dispatch(setCars(data?.cars || []));
    }
  }, [isSuccess, data?.cars, dispatch]);

  const filteredCars = filterCars(selectAllCars, selectDebouncedSearchText);
  const totalPages = 10;

  const handlePageChange = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <ErrorLoading />;
  }

  return (
    <div className="table-container">
      <Header
        searchText={selectSearchText}
        handleSearchChange={handleSearchChange}
        handleOpenModal={handleOpenModal}
      />
      <Modal open={selectOpenModal} onClose={handleCloseModal}>
        {isEditModalAction && selectSelectedCar ? (
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
        ) : isDeleteModalAction && selectSelectedCar ? (
          <DeleteCarForm
            car={selectSelectedCar}
            onClose={handleCloseModal}
            onDelete={() => handleDeleteCar(selectSelectedCar)}
          />
        ) : (
          <AddCarForm onClose={handleCloseModal} onSave={handleAddCar} />
        )}
      </Modal>
      <table>
        <TableHeader />
        <tbody>
          {isSuccess && (
            <CarsList cars={filteredCars} handleOpenModal={handleOpenModal} />
          )}
        </tbody>
      </table>
      <Pagination
        currentPage={currentPage}
        handlePageChange={handlePageChange}
        totalPages={totalPages}
      />
    </div>
  );
};

export default App;
