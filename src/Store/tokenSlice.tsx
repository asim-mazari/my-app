import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { checkToken } from "../Services/API";
interface AuthState {
  loading: boolean;
  isValid: boolean | null; // Store the boolean value indicating token validity
  error: string | null;
}
interface credentialsType {
  token: string;
}
export const checkTokenValidation = createAsyncThunk(
  "auth/check-token",
  async (tokenObject: credentialsType) => {
    const response = await checkToken(tokenObject);
    return response.isValid; // Return the isValid property from the API response
  }
);
const tokenSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    isValid: null,
    error: null as string | null,
  } as AuthState,
  reducers: {
    // ... other reducers ...
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkTokenValidation.pending, (state) => {
        state.loading = true;
        state.isValid = null;
        state.error = null;
      })
      .addCase(checkTokenValidation.fulfilled, (state, action) => {
        state.loading = false;
        state.isValid = action.payload; // Assign the isValid property
        state.error = null;
      });
  },
});
export default tokenSlice.reducer;
