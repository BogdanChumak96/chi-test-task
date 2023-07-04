import * as Yup from "yup";

export const schema = Yup.object().shape({
  color: Yup.string().required("Please enter the color"),
  price: Yup.string().required("Please enter the price"),
});
