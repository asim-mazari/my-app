import { createSlice } from "@reduxjs/toolkit";

const CountrySlice = createSlice({
  name: "Countries",
  initialState: [] as any[],
  reducers: {
    addCountries(state, action) {
      state.push(action.payload);
    },
    deleteCountry(state, action) {
      const countryIndex = state.findIndex(
        (country) => country.id === action.payload
      );
      if (countryIndex !== -1) {
        state.splice(countryIndex, 1);
      }
    },
    // In your reducer
    editCountry(state, action) {
      const { index, country } = action.payload;
      if (index >= 0 && index < state.length) {
        // Create a new state array with the updated country object
        const newState = [
          ...state.slice(0, index),
          country,
          ...state.slice(index + 1),
        ];
        return newState;
      }

      return state; // Return the original state if index is invalid
    },
  },
});

export const { addCountries, deleteCountry, editCountry } =
  CountrySlice.actions;
export default CountrySlice.reducer;
