import { configureStore } from "@reduxjs/toolkit";
import favoritesReducer from "./favoritesSlice";

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

// تحميل الحالة المحفوظة
const persistedState = loadFromLocalStorage();

const store = configureStore({
  reducer: {
    reduxFavorites: favoritesReducer,
  },
  preloadedState: persistedState,
});

// الاشتراك في تغييرات الـ Store لحفظ الحالة
store.subscribe(() => {
  saveToLocalStorage({
    reduxFavorites: store.getState().reduxFavorites,
  });
});

export default store;
