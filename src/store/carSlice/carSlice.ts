import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface carsState {
  value: number;
}

const initialState: carsState = {
  value: 0,
};

export const carsSlice = createSlice({
  name: "cars",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
  },
});

export const { increment, decrement, incrementByAmount } = carsSlice.actions;

export default carsSlice.reducer;
