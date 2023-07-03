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
  setSelectedCar,
  setModalAction,
  setSearchText,
  setDebouncedSearchText,
} from "@store/carSlice";
import { ICar } from "./types";
import "./App.css";
import { batch } from "react-redux";

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
  const { isLoading, isError, isSuccess } = useGetCarsQuery(undefined, {});

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchText(e.target.value));
    dispatch(setCurrentPage(1));
  };

  const handleOpenModal = (
    car: ICar,
    action: ModalVariants.EDIT | ModalVariants.DELETE | ModalVariants.ADD
  ) => {
    batch(() => {
      dispatch(setSelectedCar(car));
      dispatch(setOpenModal(true));
      dispatch(setModalAction(action));
    });
  };

  const handleCloseModal = () => {
    batch(() => {
      dispatch(setSelectedCar(null));
      dispatch(setOpenModal(false));
      dispatch(setModalAction(null));
    });
  };

  // Debounce search text and update debounced search text in the store
  useEffect(() => {
    const debouncedSearch = debounce(() => {
      dispatch(setDebouncedSearchText(selectSearchText));
    }, 500);
    debouncedSearch();
    dispatch(setCurrentPage(1));
  }, [selectSearchText]);

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

  return (
    <div className="table-container">
      <Header
        searchText={selectSearchText}
        handleSearchChange={handleSearchChange}
        handleOpenModal={handleOpenModal}
      />

      <Modal open={selectOpenModal} onClose={handleCloseModal}>
        <ModalContent />
      </Modal>

      <table>
        <TableHeader />
        <tbody>{carsContainer}</tbody>
      </table>

      {paginationContainer}
    </div>
  );
};

export default App;
