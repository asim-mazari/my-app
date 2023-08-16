import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const loginAsync = createAsyncThunk(
  "auth/login",
  async (formData) => {
    const request = await axios.post("http://localhost:3000/auth/login", formData);
    const response = await request.data.data;
    return response;
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    auth: null,
    error: null as string | null, // Correctly typed as string | null
  },
  reducers: {
    // ... other reducers ...
  },
  extraReducers: (builder) => {
    builder.addCase(loginAsync.pending, (state) => {
      state.loading = true;
      state.auth = null;
      state.error = null; // Reset the error
    })
    .addCase(loginAsync.fulfilled, (state, action) => {
      state.loading = false;
      state.auth = action.payload;
      state.error = null;
    })
    .addCase(loginAsync.rejected, (state, action) => {
      state.loading = false;
      state.auth = null;
      state.error = action.error.message || "An error occurred"; // Assign the error message from the action
    });
  },
});

export default authSlice.reducer;
