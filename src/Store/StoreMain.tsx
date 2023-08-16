import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./ContactClice";
import countryReducer from "./CountryClice";
import GalleryReducer from "./GalleryClice"
import { loadState, saveState } from "./localStorage";


const persistedState = loadState();

const StoreMain = configureStore({
  reducer: {
    users: userReducer,
    countries: countryReducer,
    Gallery:GalleryReducer,
  
  },
  preloadedState: persistedState, // Move preloadedState out of the reducer object
});

StoreMain.subscribe(() => {
  saveState(StoreMain.getState());
});

export default StoreMain;
