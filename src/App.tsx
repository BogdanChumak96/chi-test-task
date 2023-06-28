import React, { useState, useEffect, ChangeEvent } from "react";
import { useGetCarsQuery } from "@store/api";
import { FiSettings } from "react-icons/fi";
import { ICar } from "@types";
import "./App.css";
import Loader from "@components/Loader";
import ErrorLoading from "@components/ErrorLoading";

function App() {
  const {
    data: { cars },
    isLoading,
    isError,
    isSuccess,
  } = useGetCarsQuery({}, {});

  const [searchText, setSearchText] = useState("");
  const [debouncedSearchText, setDebouncedSearchText] = useState("");
  const [selectedCar, setSelectedCar] = useState(null);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const debounce = <T extends (...args: any[]) => any>(
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

  useEffect(() => {
    const debouncedSearch = debounce(() => {
      setDebouncedSearchText(searchText);
    }, 500);
    debouncedSearch();
  }, [searchText]);

  const handleEdit = (car: ICar) => {
    setSelectedCar(car);
  };

  const handleDelete = (car: ICar) => {
    setSelectedCar(car);
  };

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    // return <ErrorLoading message={error.response?.data?.message} />;
  }

  const filteredCars = cars.filter((car: ICar) => {
    const searchString = `${car.car} ${car.car_model} ${car.car_vin} ${
      car.car_color
    } ${car.car_model_year} ${car.price} ${
      car.availability ? "Available" : "Not Available"
    }`.toLowerCase();
    return searchString.includes(debouncedSearchText.toLowerCase());
  });

  return (
    <div className="table-container">
      <div className="search-container">
        <input
          type="text"
          placeholder="Search..."
          value={searchText}
          onChange={handleSearchChange}
          className="search-input"
        />
      </div>
      <table>
        <thead>
          <tr>
            <th>Company</th>
            <th>Model</th>
            <th>VIN</th>
            <th>Color</th>
            <th>Year</th>
            <th>Price</th>
            <th>Availability</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {isSuccess &&
            filteredCars.map((car: ICar) => (
              <tr key={car.id}>
                <td>{car.car}</td>
                <td>{car.car_model}</td>
                <td>{car.car_vin}</td>
                <td>{car.car_color}</td>
                <td>{car.car_model_year}</td>
                <td>{car.price}</td>
                <td>{car.availability ? "Available" : "Not Available"}</td>
                <td>
                  <div className="dropdown">
                    <div className="action-button">
                      <FiSettings />
                    </div>
                    <div className="dropdown-content">
                      <button onClick={() => handleEdit(car)}>Edit</button>
                      <button onClick={() => handleDelete(car)}>Delete</button>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
