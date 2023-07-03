/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, ChangeEvent } from "react";
import { useGetCarsQuery } from "@store/api";
import { debounce, filterCars } from "@utils/helpers";
import {
  Modal,
  ErrorLoading,
  Loader,
  TableHeader,
  Header,
  Pagination,
  RenderedCars,
  ModalContent,
  NoResults,
} from "@components/index";
import { ModalVariants } from "@utils/constants";
import { useAppDispatch, useAppSelector } from "@utils/hooks";
import {
  carsSelectors,
  setCurrentPage,
  setOpenModal,
  setCars,
  setSelectedCar,
  setModalAction,
  setSearchText,
  setDebouncedSearchText,
} from "@store/carSlice";
import { ICar } from "./types";
import "./App.css";

const App: React.FC = () => {
  const dispatch = useAppDispatch();

  // Select data from the store
  const currentPage = useAppSelector(carsSelectors.selectCurrentPage);
  const selectOpenModal = useAppSelector(carsSelectors.selectOpenModal);
  const selectAllCars = useAppSelector(carsSelectors.selectAllCars);
  const selectSearchText = useAppSelector(carsSelectors.selectSearchText);
  const selectDebouncedSearchText = useAppSelector(
    carsSelectors.selectDebouncedSearchText
  );
  const selectPageSize = useAppSelector(carsSelectors.selectPageSize);

  // Fetch cars data
  const { data, isLoading, isError, isSuccess } = useGetCarsQuery(
    undefined,
    {}
  );

  // Event handlers
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchText(e.target.value));
    dispatch(setCurrentPage(1));
  };

  const handleOpenModal = (
    car: ICar,
    action: ModalVariants.EDIT | ModalVariants.DELETE | ModalVariants.ADD
  ) => {
    dispatch(setSelectedCar(car));
    dispatch(setOpenModal(true));
    dispatch(setModalAction(action));
  };

  const handleCloseModal = () => {
    dispatch(setOpenModal(false));
    dispatch(setSelectedCar(null));
    dispatch(setModalAction(null));
  };

  // Debounce search text and update debounced search text in the store
  useEffect(() => {
    const debouncedSearch = debounce(() => {
      dispatch(setDebouncedSearchText(selectSearchText));
    }, 500);
    debouncedSearch();
    dispatch(setCurrentPage(1));
  }, [selectSearchText, dispatch]);

  const handlePageChange = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  // Filter cars based on search text
  const filteredCars = filterCars(selectAllCars, selectDebouncedSearchText);
  const totalPages = Math.ceil(filteredCars.length / selectPageSize);

  const startIndex = (currentPage - 1) * selectPageSize;
  const endIndex = startIndex + selectPageSize;
  const visibleCars = filteredCars.slice(startIndex, endIndex);

  const carsContainer =
    visibleCars.length > 0 ? (
      <RenderedCars
        handleOpenModal={handleOpenModal}
        isSuccess={isSuccess}
        visibleCars={visibleCars}
      />
    ) : (
      <tr>
        <td colSpan={8}>
          <NoResults />
        </td>
      </tr>
    );

  const paginationContainer = filteredCars.length > selectPageSize && (
    <div className="pagination-container">
      <Pagination
        currentPage={currentPage}
        handlePageChange={handlePageChange}
        totalPages={totalPages}
      />
    </div>
  );

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <ErrorLoading />;
  }

  // Render the main component
  return (
    <div className="table-container">
      {/* Render header component with search functionality */}
      <Header
        searchText={selectSearchText}
        handleSearchChange={handleSearchChange}
        handleOpenModal={handleOpenModal}
      />

      {/* Render modal component based on modal state */}
      <Modal open={selectOpenModal} onClose={handleCloseModal}>
        <ModalContent />
      </Modal>

      {/* Render table with car data */}
      <table>
        <TableHeader />
        <tbody>{carsContainer}</tbody>
      </table>

      {/* Render pagination component */}
      {paginationContainer}
    </div>
  );
};

export default App;
