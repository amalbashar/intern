import { createSlice } from "@reduxjs/toolkit";

const navbarSlice = createSlice({
  name: "navbar",
  initialState: {
    activePage: "Add Task", 
  },
  reducers: {
    setActivePage: (state, action) => {
      state.activePage = action.payload; 
    },
  },
});

export const { setActivePage } = navbarSlice.actions; 
export default navbarSlice.reducer; 
