import { ModalVariants } from "@utils/constants";
import { ReactNode } from "react";

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
  pageSize: number;
}

export interface ICar {
  id: string;
  car: string;
  car_model: string;
  company: string;
  car_vin: string;
  car_model_year: number;
  car_color: string;
  price: number | string;
  availability: boolean;
  setCompany: (company: string) => void;
  setModel: (model: string) => void;
  setVin: (vin: string) => void;
  setYear: (year: number) => void;
  setColor: (color: string) => void;
  setPrice: (price: number | string) => void;
  setAvailability: (availability: boolean) => void;
}

export interface ICarItem {
  car: ICar;
  handleOpenModal: (
    car: ICar,
    action: ModalVariants.EDIT | ModalVariants.DELETE
  ) => void;
}

export interface ICarList {
  cars: ICar[];
  handleOpenModal: (
    car: ICar,
    action: ModalVariants.DELETE | ModalVariants.EDIT
  ) => void;
}

export interface IDeleteCarFormProps {
  car: ICar | null;
  onClose: () => void;
  onDelete: () => void;
}

export interface AddCarFormProps {
  onClose: () => void;
  onSave: (car: any) => void;
}

export interface IEditProps {
  car: ICar;
  color: string;
  price: string;
  availability: boolean;
  onClose: () => void;
  onSave: () => void;
  setColor: (color: string) => void;
  setPrice: (string: string) => void;
  setAvailability: (availability: boolean) => void;
}

export interface IHeader {
  searchText: string;
  handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleOpenModal: (car: any, action: ModalVariants.ADD) => void;
}

export interface IModalProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
}

export interface IPagination {
  totalPages: number;
  handlePageChange: (page: number) => void;
  currentPage: number;
}

export type ErrorBoundaryProps = {
  children: ReactNode;
};

export type ErrorBoundaryState = {
  hasError: boolean;
};

export interface IRenderContent {
  isSuccess: boolean;
  visibleCars: ICar[];
  handleOpenModal: (
    car: ICar,
    action: ModalVariants.EDIT | ModalVariants.DELETE
  ) => void;
}
