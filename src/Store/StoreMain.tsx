import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./ContactClice";

const StoreMain = configureStore({
  reducer: {
    users: userReducer,
  },
});

export default StoreMain;
