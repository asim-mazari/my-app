import { createSlice } from "@reduxjs/toolkit";

const GalleryClice = createSlice({
  name: "Gallery",
  initialState: [] as any[],
  reducers: {
    addGallery(state, action) {
      state.push(action.payload);
    },
    deleteGallery(state, action) {
      const countryIndex = state.findIndex(
        (country) => country.id === action.payload
      );
      if (countryIndex !== -1) {
        state.splice(countryIndex, 1);
      }
    },

    editGallery(state, action) {
      const { index, gallery } = action.payload;
    
      if (index >= 0 && index < state.length) {
        // Create a new state array with the updated country object
        const newState = [
          ...state.slice(0, index),
          gallery,
          ...state.slice(index + 1),
        ];
    
        return newState;
      }
    
      return state; // Return the original state if index is invalid
    }
  },
});

export const { addGallery,deleteGallery,editGallery } =
GalleryClice.actions;
export default GalleryClice.reducer;
