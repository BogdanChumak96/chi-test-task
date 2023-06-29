import { ICar } from "./../../types/index";

export const filterCars = (
  cars: ICar[] | undefined,
  searchText: string | undefined
) => {
  if (typeof cars === "undefined" || typeof searchText === "undefined") {
    return [];
  }

  const filteredCars = cars.filter((car: ICar) => {
    const searchString = `${car.car} ${car.car_model} ${car.car_vin} ${
      car.car_color
    } ${car.car_model_year} ${car.price} ${
      car.availability ? "Available" : "Not Available"
    }`.toLowerCase();
    return searchString.includes(searchText.toLowerCase());
  });

  return filteredCars;
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
