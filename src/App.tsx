import "./App.css";
import { useEffect } from "react";
import { RootState } from "@store/index";
import { decrement, increment } from "@store/carSlice/carSlice";
import { useAppDispatch, useAppSelector } from "@utils/hooks/";
import { useGetCarsQuery } from "@store/api";
import { Button, List } from "@components/index";

function App() {
  const count = useAppSelector((state: RootState) => state.cars.value);
  const dispatch = useAppDispatch();
  const { data, isSuccess } = useGetCarsQuery({}, {});
  useEffect(() => {
    isSuccess && console.log(data);
  }, []);
  return (
    <>
      Start project {count}
      <button onClick={() => dispatch(decrement())}>Add</button>
      <button onClick={() => dispatch(increment())}>Add</button>
      <Button />
      <List />
    </>
  );
}

export default App;
