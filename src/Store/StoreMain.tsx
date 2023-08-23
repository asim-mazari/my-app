import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./ContactSlice";
import countryReducer from "./CountrySlice";
import GalleryReducer from "./GallerySlice"
import { loadState, saveState } from "./localStorage";
import authReducer from './authSlice';


const persistedState = loadState();

const StoreMain = configureStore({
  reducer: {
    users: userReducer,
    countries: countryReducer,
    Gallery:GalleryReducer,
    auth: authReducer,
  },
  preloadedState: persistedState, // Move preloadedState out of the reducer object
});

StoreMain.subscribe(() => {
  saveState(StoreMain.getState());
});

export default StoreMain;
