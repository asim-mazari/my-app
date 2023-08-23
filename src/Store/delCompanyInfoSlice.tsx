// registerSlice.ts

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { removeComapnyiInfo } from "../Services/API";

interface companyId {
    id: number;
}
export const delCompanyInfo = createAsyncThunk(
  "DeleteInfo",
  async (data: companyId) => {
    const response = await removeComapnyiInfo(data);
    return response.data;
  }
);
const delCompanyInfoSlice = createSlice({
  name: "Delete",
  initialState: {
    loading: false,
    info: null,
    error: null as string | null,
  },
  reducers: {
    // Add other reducers if needed
  },
  extraReducers: (builder) => {
    builder
      .addCase(delCompanyInfo.pending, (state) => {
        state.loading = true;
        state.info = null;
        state.error = null;
      })
      .addCase(delCompanyInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.info = action.payload;
        state.error = null;
      })
      .addCase(delCompanyInfo.rejected, (state, action) => {
        state.loading = false;
        state.info = null;
        state.error = action.error.message || "An error occurred";
      });
  },
});

export default delCompanyInfoSlice.reducer;
