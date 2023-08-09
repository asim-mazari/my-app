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
        return state.map((item, i) => (i === index ? gallery : item));
      }
    
      return state;
    }
    
  },
});

export const { addGallery,deleteGallery,editGallery } =
GalleryClice.actions;
export default GalleryClice.reducer;
