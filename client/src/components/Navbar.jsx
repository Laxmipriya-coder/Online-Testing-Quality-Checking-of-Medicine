import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./navbar.css";
import logo from "../images/logo.png";

const Navbar = ({darkMode, setDarkMode}) => {
  
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <nav className="navbar">

      {/* Logo */}
      <div className="logo-section" onClick={() => navigate("/")}>
        <img src={logo} alt="logo" />
        <span className="brand">MediVerify</span>
      </div>

      {/* Hamburger */}
      <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        ☰
      </div>

      {/* Links */}
      <ul className={`nav-links ${menuOpen ? "active" : ""}`}>
        <li><Link to="/" onClick={() => setMenuOpen(false)}>Home</Link></li>
        <li><Link to="/scan" onClick={() => setMenuOpen(false)}>Scan</Link></li>
        <li><Link to="/report" onClick={() => setMenuOpen(false)}>Report</Link></li>
        <li><Link to="/dashboard" onClick={() => setMenuOpen(false)}>Dashboard</Link></li>

       
        {/* Mobile login button */}
        <button className="login-btn mobile" onClick={handleLogin}>
          Login
        </button>
      </ul>

      {/* Desktop Right Side */}
      <div className="nav-right">
        <button className="login-btn" onClick={handleLogin}>
          Login
        </button>
      </div>
      
    </nav>
  );
};

export default Navbar;