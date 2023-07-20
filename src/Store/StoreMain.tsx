import { configureStore } from "@reduxjs/toolkit";
import { userClice } from "./ContactClice";


const StoreMain=configureStore({
    reducer:{
        users: userClice.reducer,
    },
});


export default StoreMain;