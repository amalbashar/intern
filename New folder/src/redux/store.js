import { configureStore } from "@reduxjs/toolkit";
import navbarReducer from "./navbarSlice"; 

const store = configureStore({
  reducer: {
    navbar: navbarReducer, 
  },
});

export default store;
