import { configureStore } from "@reduxjs/toolkit";
import favoritesReducer from "./favoritesSlice";


const store = configureStore({
    reducer: {
        reduxFavorites: favoritesReducer,
    },
});

export default store;
