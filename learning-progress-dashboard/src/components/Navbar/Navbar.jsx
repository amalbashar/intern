import React from "react";
import { Link } from "react-router-dom";

import { useNavigate, useLocation } from "react-router-dom";
import "./Navbar.css";
import logo from "../../assets/logo.png"; // الشعار الخاص بالموقع

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // وظيفة التنقل إلى الأسبوع المناسب
  const handleNavClick = (weekId) => {
    if (location.pathname === "/week-details") {
      // إذا كنت بالفعل في صفحة WeekDetails، قم بالتمرير
      document.getElementById(`week-${weekId}`)?.scrollIntoView({ behavior: "smooth" });
    } else {
      // إذا كنت خارج الصفحة، انتقل إليها أولاً ثم قم بالتمرير
      navigate("/week-details");
      setTimeout(() => {
        document.getElementById(`week-${weekId}`)?.scrollIntoView({ behavior: "smooth" });
      }, 100); // تأخير لضمان تحميل الصفحة قبل التمرير
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo-container">
        {/* الشعار والنص */}
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
        <li onClick={() => handleNavClick(1)}>Week 1</li>
        <li onClick={() => handleNavClick(2)}>Week 2</li>
        <li onClick={() => handleNavClick(3)}>Week 3</li>
        <li onClick={() => handleNavClick(4)}>Week 4</li>
      </ul>
    </nav>
  );
};

export default Navbar;
