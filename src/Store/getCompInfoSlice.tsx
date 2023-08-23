// registerSlice.ts

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getComapnyInfo } from "../Services/API";

export const getCompanyInfo = createAsyncThunk(
  "getCompany",
  async () => {
    const response = await getComapnyInfo();
    return response.data;
  }
);

const getCompanySlice = createSlice({
  name: "getInfo",
  initialState: [] as any[],
  reducers: {
    setData: (state, action) => {
      state.push(action.payload);
    },
  },
  
});
export const { setData } =
getCompanySlice.actions;
export default getCompanySlice.reducer;
