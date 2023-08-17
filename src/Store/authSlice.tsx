import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginUserApi } from "../Services/API";

interface credentialsType {
  Email: string;
  password: string;
}
 
export const loginUser = createAsyncThunk(
  "auth/login",
  async (formData: credentialsType) => {
    const request = await loginUserApi(formData);
    const response = request.data;
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
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.auth = null;
        state.error = null; // Reset the error
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.auth = action.payload;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.auth = null;
        state.error = action.error.message || "An error occurred"; // Assign the error message from the action
      });
  },
});

export default authSlice.reducer;
