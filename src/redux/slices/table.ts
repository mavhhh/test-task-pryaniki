import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const HOST = "https://test.v5.pryaniky.com";

export type TableRow = {
  id?: string;
  companySigDate: string | null;
  companySignatureName: string;
  documentName: string;
  documentStatus: string;
  documentType: string;
  employeeNumber: string;
  employeeSigDate: string | null;
  employeeSignatureName: string;
};

export const fetchTable = createAsyncThunk(
  "table/fetchTable",
  async (token: string) => {
    const response = await axios.get(
      `${HOST}/ru/data/v3/testmethods/docs/userdocs/get`,
      {
        headers: {
          "x-auth": token,
        },
      }
    );
    const { data } = response.data;
    return data;
  }
);

export type TableState = {
  table: TableRow[];
  status: "pending" | "fulfilled" | "rejected";
  error: any;
};

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
