import { useState, useEffect, ChangeEvent } from "react";
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

const App = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [openModal, setOpenModal] = useState(false);
  const [selectedCar, setSelectedCar] = useState<ICar | null>(null);
  const [modalAction, setModalAction] = useState<
    "edit" | "delete" | "add" | null
  >(null);
  const [color, setColor] = useState("");
  const [price, setPrice] = useState("");
  const [availability, setAvailability] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [debouncedSearchText, setDebouncedSearchText] = useState("");
  const [cars, setCars] = useState<ICar[]>([]);

  const { data, isLoading, isError, isSuccess } = useGetCarsQuery({}, {});

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
    setCurrentPage(1);
  };

  const isEditModalAction = modalAction === ModalVariants.EDIT;
  const isDeleteModalAction = modalAction === ModalVariants.DELETE;
  const isAddModalAction = modalAction === ModalVariants.ADD;

  const handleOpenModal = (car: ICar, action: "edit" | "delete" | "add") => {
    setSelectedCar(car);
    setOpenModal(true);
    setModalAction(action);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedCar(null);
    setModalAction(null);
  };

  const handleColorUpdate = (color: string) => {
    setColor(color);
  };

  const handlePriceUpdate = (newPrice: string) => {
    setPrice(newPrice);
  };

  const handleAvailabilityUpdate = (availability: boolean) => {
    setAvailability(availability);
  };

  const handleSaveCar = () => {
    if (selectedCar) {
      const updatedCar: ICar = {
        ...selectedCar,
        car_color: color,
        price: price,
        availability: availability,
      };

      const updatedCars = cars.map((car: ICar) =>
        car.id === updatedCar.id ? updatedCar : car
      );

      setCars(updatedCars);
      handleCloseModal();
    }
  };

  const handleDeleteCar = (car: ICar) => {
    const updatedCars = cars.filter((c: ICar) => c.id !== car.id);
    setCars(updatedCars);
    handleCloseModal();
  };

  const handleAddCar = (newCar: ICar) => {
    const updatedCars = [...cars, newCar];
    setCars(updatedCars);
    handleCloseModal();
  };

  useEffect(() => {
    const debouncedSearch = debounce(() => {
      setDebouncedSearchText(searchText);
    }, 500);
    debouncedSearch();
    setCurrentPage(1);
  }, [searchText]);

  useEffect(() => {
    if (isSuccess) {
      setCars(data?.cars || []);
    }
  }, [isSuccess, data?.cars]);

  const filteredCars = filterCars(cars, debouncedSearchText);
  const totalPages = 10;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
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
        searchText={searchText}
        handleSearchChange={handleSearchChange}
        handleOpenModal={handleOpenModal}
      />
      <Modal open={openModal} onClose={handleCloseModal}>
        {isEditModalAction && selectedCar ? (
          <EditCarForm
            color={color}
            price={price}
            availability={availability}
            car={selectedCar}
            onClose={handleCloseModal}
            onSave={handleSaveCar}
            setColor={handleColorUpdate}
            setPrice={handlePriceUpdate}
            setAvailability={handleAvailabilityUpdate}
          />
        ) : isDeleteModalAction && selectedCar ? (
          <DeleteCarForm
            car={selectedCar}
            onClose={handleCloseModal}
            onDelete={() => handleDeleteCar(selectedCar)}
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
