import { configureStore } from "@reduxjs/toolkit";
import favoritesReducer from "./chat/favoritesSlice";
import productReducer from "./ecom/productSlice"; 
import cartReducer from "./ecom/cartSlice"; 


const saveToLocalStorage = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("reduxState", serializedState);
  } catch (error) {
    console.error("Could not save state:", error);
  }
};

const loadFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem("reduxState");
    if (serializedState === null) return undefined;
    return JSON.parse(serializedState);
  } catch (error) {
    console.error("Could not load state:", error);
    return undefined;
  }
};

const persistedState = loadFromLocalStorage();

const store = configureStore({
  reducer: {
    reduxFavorites: favoritesReducer,
    products: productReducer, 
    cart: cartReducer,


  },
  preloadedState: persistedState,
});

store.subscribe(() => {
  const currentState = store.getState();

  if (localStorage.getItem("isAuthenticated") === "true") {
    saveToLocalStorage(currentState);
  } else {
    localStorage.removeItem("reduxState");
  }

});





export default store;
