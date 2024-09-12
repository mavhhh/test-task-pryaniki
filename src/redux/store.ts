import { configureStore } from "@reduxjs/toolkit";
import table from "./slices/table";
import token from "./slices/token";
import { useDispatch } from "react-redux";

export const store = configureStore({
  reducer: {
    token,
    table,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
