

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";

import Home from "./pages/Home";
import WeekDetails from "./pages/WeekDetails";
import FullTaskWeek2 from "./components/WeeklyTasks/Week2/FullTask";
import { FavoritesProvider, useFavorites } from "./components/WeeklyTasks/Week3/Components/FavoritesContext";
import ContextFavorites from "./components/WeeklyTasks/Week3/Pages/ContextFavorites";
import ReduxFavorites from "./components/WeeklyTasks/Week3/Pages/ReduxFavorites";





function App() {
  return (
    <Router>
            <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/week/:id" element={<WeekDetails />} />
        <Route path="/week2/*" element={<FullTaskWeek2 />} />
        <Route path="/redux-favorites" element={<ReduxFavorites />} />
        <Route path="/context-favorites" element={<ContextFavorites />} />

      </Routes>
    </Router>
  );
}

export default App;
