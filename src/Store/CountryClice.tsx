import { createSlice } from "@reduxjs/toolkit";

const CountrySlice = createSlice({
  name: "Countries",
  initialState: [] as any[],
  reducers: {
    addCountries(state, action) {
      state.push(action.payload);
    },
    deleteCountry(state, action) {
      const countryIndex = state.findIndex((country) => country.id === action.payload);
      if (countryIndex !== -1) {
        state.splice(countryIndex, 1);
      }
    },
    editCountry(state, action) {
      const { code, cities: updatedCities } = action.payload;
      const countryIndex = state.findIndex((country) => country.code === code);
      if (countryIndex !== -1) {
        state[countryIndex] = { ...state[countryIndex], cities: updatedCities };
      }
    },
  },
});

export const { addCountries, deleteCountry, editCountry } = CountrySlice.actions;
export default CountrySlice.reducer;
