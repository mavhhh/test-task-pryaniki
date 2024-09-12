import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getTable } from "../../api/table";

import type { TableState } from "../../types/table";

export const fetchTable = createAsyncThunk(
  "table/fetchTable",
  async (token: string) => {
    const response = await getTable(token);
    const { data } = response.data;
    return data;
  }
);

const initialState: TableState = { table: [], status: "pending", error: null };

const tableSlice = createSlice({
  name: "table",
  initialState,
  reducers: {
    setTable(state, action) {
      state.table = action.payload;
    },

    deleteRowByID(state, action) {
      state.table = state.table.filter((i) => i.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTable.pending, (state) => {
      state.status = "pending";
    });

    builder.addCase(fetchTable.fulfilled, (state, action) => {
      state.table = action.payload;
      state.status = "fulfilled";
    });

    builder.addCase(fetchTable.rejected, (state, action) => {
      state.status = "rejected";
      state.error = action.payload;
    });
  },
});

export const { setTable, deleteRowByID } = tableSlice.actions;

export default tableSlice.reducer;
