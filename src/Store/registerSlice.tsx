// registerSlice.ts

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { registerApi } from "../Services/API";

interface userData {
  FirstName: string;
  Lastname: string;
  Email: string;
  password: string;
  dob: string;
  Address: string;
}

export const registerUser = createAsyncThunk(
  "auth/register",
  async (formData: userData) => {
    const response = await registerApi(formData);
    return response.data;
  }
);

const registerSlice = createSlice({
  name: "register",
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
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.user = null;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.error = action.error.message || "An error occurred";
      });
  },
});

export default registerSlice.reducer;
