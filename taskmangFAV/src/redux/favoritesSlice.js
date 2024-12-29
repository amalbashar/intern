import { createSlice } from "@reduxjs/toolkit";

const favoritesSlice = createSlice({
    name: "reduxFavorites",
    initialState: [],
    reducers: {
        addReduxFavorite: (state, action) => {
            if (!state.includes(action.payload)) {
                state.push(action.payload);
            }
        },
        removeReduxFavorite: (state, action) => {
            return state.filter((index) => index !== action.payload);
        },
    },
});

export const { addReduxFavorite, removeReduxFavorite } = favoritesSlice.actions;

export default favoritesSlice.reducer;
