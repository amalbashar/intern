import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul>
        <li>
          <NavLink
            to="/week2/add-task"
            className={({ isActive }) => (isActive ? "active-link" : "")}
          >
            Add Task
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/week2/task-list"
            className={({ isActive }) => (isActive ? "active-link" : "")}
          >
            Task List
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
