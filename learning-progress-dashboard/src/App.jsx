import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home";
import WeekDetails from "./pages/WeekDetails";
import ReduxFavorites from "./components/WeeklyTasks/Week3/Pages/ReduxFavorites";
import ContextFavorites from "./components/WeeklyTasks/Week3/Pages/ContextFavorites";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* الصفحة الرئيسية */}
        <Route path="/" element={<Home />} />
        
        {/* صفحة التفاصيل لكل أسبوع */}
        <Route path="/week-details" element={<WeekDetails />} />

        {/* الصفحات الإضافية */}
        <Route path="/redux-favorites" element={<ReduxFavorites />} />
        <Route path="/context-favorites" element={<ContextFavorites />} />
      </Routes>
    </Router>
  );
}

export default App;
