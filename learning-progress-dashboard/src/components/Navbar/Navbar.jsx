import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import logo from "../../assets/logo.png"; // استيراد اللوغو

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo-container">
        <div className="navbar-logo">
          <img src={logo} alt="Logo" className="logo-image" />
          <div className="logo-text">
            <span className="site-name">REACTINARY</span>
            <span className="site-tagline">Your React Learning Partner</span>
          </div>
        </div>
      </div>
      <ul className="navbar-links">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/week/1">Week 1</Link>
        </li>
        <li>
          <Link to="/week/2">Week 2</Link>
        </li>
        <li>
          <Link to="/week/3">Week 3</Link>
        </li>
        <li>
          <Link to="/week/4">Week 4</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
