import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Button from "./reusable/Button";




  
const Navbar = ({ isAuthenticated, handleLogout }) => {
  const location = useLocation();
  return (
    <nav style={{ padding: "10px", background: "#f0f0f0" }}>
      <Link to="/" style={{ margin: "10px" }}>Home</Link>
      <Link to="/chat" style={{ margin: "10px" }}>Chat</Link>
      <Link to="/taskmang" style={{ margin: "10px" }}>Task Management</Link>
      <Link to="/ecommerce" style={{ margin: "10px" }}>E-commerce</Link>
  
      {isAuthenticated && (
          
          <Button 
          label="Logout" 
          onClick={handleLogout} 
        />
         
        )}
    </nav>
  );
};

export default Navbar;
