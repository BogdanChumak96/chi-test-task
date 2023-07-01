import { debounce, filterCars } from "./";

describe("debounce", () => {
  jest.useFakeTimers();

  test("should call the debounced function only once after the specified delay", () => {
    const mockFn = jest.fn();
    const debouncedFn = debounce(mockFn, 1000);

    // Call the debounced function multiple times within the delay period
    debouncedFn();
    debouncedFn();
    debouncedFn();

    // Fast-forward time by 1000ms
    jest.advanceTimersByTime(1000);

    // The debounced function should be called only once
    expect(mockFn).toHaveBeenCalledTimes(1);
  });

  test("should call the debounced function with the latest arguments", () => {
    const mockFn = jest.fn();
    const debouncedFn = debounce(mockFn, 1000);

    // Call the debounced function with different arguments
    debouncedFn("Hello");
    debouncedFn("World");

    // Fast-forward time by 1000ms
    jest.advanceTimersByTime(1000);

    // The debounced function should be called once with the latest argument ("World")
    expect(mockFn).toHaveBeenCalledTimes(1);
    expect(mockFn).toHaveBeenCalledWith("World");
  });

  test("should preserve the correct 'this' context when calling the debounced function", () => {
    const context = { name: "TestContext" };
    const mockFn = jest.fn(function (this: any) {
      expect(this).toBe(context);
    });
    const debouncedFn = debounce(mockFn, 1000);

    // Call the debounced function with a specific context
    debouncedFn.call(context);

    // Fast-forward time by 1000ms
    jest.advanceTimersByTime(1000);

    // The debounced function should be called with the correct context
    expect(mockFn).toHaveBeenCalledTimes(1);
  });
});

const cars = [
  {
    car: "Toyota",
    car_model: "Camry",
    car_vin: "123456789",
    car_color: "Blue",
    car_model_year: 2020,
    price: 25000,
    availability: true,
    id: "1",
    company: "",
  },
  {
    car: "Honda",
    car_model: "Civic",
    car_vin: "987654321",
    car_color: "Red",
    car_model_year: 2019,
    price: 20000,
    availability: false,
    id: "2",
    company: "",
  },
];

describe("filterCars", () => {
  test("should return an empty array when cars or searchText is undefined", () => {
    expect(filterCars(undefined, "Toyota")).toEqual([]);
    expect(filterCars(cars, undefined)).toEqual([]);
    expect(filterCars(undefined, undefined)).toEqual([]);
  });

  test("should return the original cars array when searchText is empty", () => {
    expect(filterCars(cars, "")).toEqual(cars);
    expect(filterCars(cars, "   ")).toEqual(cars);
  });

  test("should return the filtered array based on the searchText", () => {
    expect(filterCars(cars, "Red")).toEqual([cars[1]]);
    expect(filterCars(cars, "2019")).toEqual([cars[1]]);
    expect(filterCars(cars, "NOT AVAILABLE")).toEqual([cars[1]]);
  });
});
