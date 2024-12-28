import React from "react";
import { Link } from "react-router-dom";

const navbarStyle = {
  position: "fixed",
  top: "0",
  left: "25%",
  width: "50%",
  height: "60px",
  backgroundColor: "#f4f4f4",
  display: "flex",
  justifyContent: "space-around",
  alignItems: "center",
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  zIndex: "1000",
};








const Navbar = () => {
  return (
    <nav style={navbarStyle}>
      <Link to="/add-task">Add Task</Link>
      <Link to="/task-list">Task List</Link>
    </nav>
  );
};

export default Navbar;
