import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setActivePage } from "../redux/navbarSlice"; 

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

const activeLinkStyle = {
  fontWeight: "bold",
  color: "blue",
};

const Navbar = () => {
  const activePage = useSelector((state) => state.navbar.activePage); //بيجيب الاكتف بيج من الستور 
  const dispatch = useDispatch();  // بيستخدم ليرسل الاكشنز

  const handleNavigation = (page) => {
    dispatch(setActivePage(page)); //بيغير الاكتف بيج 
  };

  return (
    <nav style={navbarStyle}>
      <Link
        to="/add-task"
        style={activePage === "Add Task" ? activeLinkStyle : {}}
        onClick={() => handleNavigation("Add Task")}
      >
        Add Task
      </Link>
      <Link
        to="/task-list"
        style={activePage === "Task List" ? activeLinkStyle : {}}
        onClick={() => handleNavigation("Task List")}
      >
        Task List
      </Link>
    </nav>
  );
};

export default Navbar;
