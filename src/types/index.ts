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
