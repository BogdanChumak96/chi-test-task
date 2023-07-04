import * as Yup from "yup";

export const schema = Yup.object().shape({
  company: Yup.string().trim().required("Please enter the company"),
  model: Yup.string().trim().required("Please enter the model"),
  vin: Yup.string()
    .trim()
    .required("Please enter the VIN")
    .min(8, "VIN must be at least 8 characters"),
  year: Yup.string()
    .required("Please enter the year")
    .length(4, "Year must consist of 4 digits"),
  color: Yup.string()
    .trim()
    .required("Please enter the color")
    .matches(/^[a-zA-Z]+$/, "Color must consist of letters only"),
  price: Yup.number()
    .required("Please enter the price")
    .moreThan(0, "Price must be greater than 0"),
  availability: Yup.string().required("Please select the availability"),
});
