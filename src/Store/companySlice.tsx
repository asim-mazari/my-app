// registerSlice.ts

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { companyInformation } from "../Services/API";

interface userData {
    id: number;
  
    Lable: string;
  
    FullName: string;
  
    Mobile: string;
  
    Email: string;
  
    Address: string;

    City: string;
  
    Country: string;
}

export const addCompanyInformation = createAsyncThunk(
  "company",
  async (data: userData) => {
    const response = await companyInformation(data);
    return response.data;
  }
);

const CompanySlice = createSlice({
  name: "addInfo",
  initialState: {
    loading: false,
    user: null,
    error: null as string | null,
  },
  reducers: {
    // Add other reducers if needed
  },
  extraReducers: (builder) => {
    builder
      .addCase(addCompanyInformation.pending, (state) => {
        state.loading = true;
        state.user = null;
        state.error = null;
      })
      .addCase(addCompanyInformation.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(addCompanyInformation.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.error = action.error.message || "An error occurred";
      });
  },
});

export default CompanySlice.reducer;
