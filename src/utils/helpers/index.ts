import { IsAble } from "@utils/constants";
import {  ErrorMessages, ICar } from "./../../types/index";

export const filterCars = (
  cars: ICar[] | undefined,
  searchText: string | undefined
) => {
  if (typeof cars === "undefined" || typeof searchText === "undefined") {
    return [];
  }

  if (searchText.trim() === "") {
    return cars;
  }

  const filteredCars = cars.filter((car: ICar) => {
    const searchString = `${car.car} ${car.car_model} ${car.car_vin} ${car.car_color} ${car.car_model_year} ${car.price}`;
    const availabilityString = car.availability ? "AVAILABLE" : "NOT AVAILABLE";
    return (
      searchString.toLowerCase().includes(searchText.toLowerCase()) ||
      availabilityString.toLowerCase().includes(searchText.toLowerCase())
    );
  });

  return filteredCars || [];
};

export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timer: ReturnType<typeof setTimeout>;

  return function (this: unknown, ...args: Parameters<T>) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
};

export const getInputs = (formData: any, errorMessages: ErrorMessages) => {
  return [
    {
      label: "Company",
      name: "company",
      value: formData.company,
      errorMessage: errorMessages.company,
    },
    {
      label: "Model",
      name: "model",
      value: formData.model,
      errorMessage: errorMessages.model,
    },
    {
      label: "VIN",
      name: "vin",
      value: formData.vin,
      errorMessage: errorMessages.vin,
    },
    {
      label: "Year",
      name: "year",
      value: formData.year,
      errorMessage: errorMessages.year,
    },
    {
      label: "Color",
      name: "color",
      value: formData.color,
      errorMessage: errorMessages.color,
    },
    {
      label: "Price",
      name: "price",
      value: formData.price.toString(),
      errorMessage: errorMessages.price,
    },
    {
      label: "Availability",
      name: "availability",
      value: formData.availability,
      errorMessage: errorMessages.availability,
      options: [
        { value: "true", label: IsAble.AVAILABLE },
        { value: "false", label: IsAble.NOTAVAILABLE },
      ],
    },
  ];
};
