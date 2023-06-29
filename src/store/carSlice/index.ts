import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { ICar } from "../../types";
import { RootState } from "..";

export interface carsState {
  currentPage: number;
  openModal: boolean;
  selectedCar: ICar | null;
  modalAction: "edit" | "delete" | "add" | null;
  value: number;
  cars: ICar[];
  color: string;
  price: string;
  availability: boolean;
  searchText: string;
  debouncedSearchText: string;
}

const initialState: carsState = {
  currentPage: 1,
  openModal: false,
  selectedCar: null,
  modalAction: null,
  value: 0,
  cars: [],
  color: "",
  price: "",
  availability: false,
  searchText: "",
  debouncedSearchText: "",
};

export const carsSlice = createSlice({
  name: "cars",
  initialState,
  reducers: {
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setOpenModal: (state, action: PayloadAction<boolean>) => {
      state.openModal = action.payload;
    },
    setSelectedCar: (state, action: PayloadAction<ICar | null>) => {
      state.selectedCar = action.payload;
    },
    setModalAction: (
      state,
      action: PayloadAction<"edit" | "delete" | "add" | null>
    ) => {
      state.modalAction = action.payload;
    },
    setCars: (state, action: PayloadAction<ICar[]>) => {
      state.cars = action.payload;
    },
    setColor: (state, action) => {
      state.color = action.payload;
    },
    setPrice: (state, action) => {
      state.price = action.payload;
    },
    setAvailability: (state, action) => {
      state.availability = action.payload;
    },
    setSearchText: (state, action) => {
      state.searchText = action.payload;
    },
    setDebouncedSearchText: (state, action) => {
      state.debouncedSearchText = action.payload;
    },
  },
});

export const {
  setCurrentPage,
  setOpenModal,
  setSelectedCar,
  setModalAction,
  setCars,
  setColor,
  setPrice,
  setAvailability,
  setSearchText,
  setDebouncedSearchText,
} = carsSlice.actions;

export const selectCurrentPage = (state: RootState) => state.cars.currentPage;
export const selectOpenModal = (state: RootState) => state.cars.openModal;
export const selectSelectedCar = (state: RootState) => state.cars.selectedCar;
export const selectModalAction = (state: RootState) => state.cars.modalAction;
export const selectValue = (state: RootState) => state.cars.value;
export const selectAllCars = (state: RootState) => state.cars.cars;
export const selectColor = (state: RootState) => state.cars.color;
export const selectPrice = (state: RootState) => state.cars.price;
export const selectAvailability = (state: RootState) => state.cars.availability;
export const selectSearchText = (state: RootState) => state.cars.searchText;
export const selectDebouncedSearchText = (state: RootState) =>
  state.cars.debouncedSearchText;

export const carsSelectors = {
  selectCurrentPage,
  selectOpenModal,
  selectSelectedCar,
  selectModalAction,
  selectValue,
  selectAllCars,
  selectColor,
  selectPrice,
  selectAvailability,
  selectSearchText,
  selectDebouncedSearchText,
};

export default carsSlice.reducer;
