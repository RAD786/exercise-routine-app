import { configureStore } from "@reduxjs/toolkit";
import routinesReducer from "../../src/features/routinesSlice";

export const store = configureStore({
  reducer: {
    routines: routinesReducer,
  },
});

export default store;
