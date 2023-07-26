import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./ContactClice";
import { loadState, saveState } from "./localStorage";

const persistedState = loadState();

const StoreMain = configureStore({
  reducer: {
    users: userReducer,
  },
  preloadedState: persistedState, // Move preloadedState out of the reducer object
});

StoreMain.subscribe(() => {
  saveState(StoreMain.getState());
});

export default StoreMain;
