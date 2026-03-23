import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./navbar.css";
import logo from "../images/logo.png";

const Navbar = () => {
  const navigate = useNavigate();

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

      {/* Links */}
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/scan">Scan</Link></li>
        <li><Link to="/report">Report</Link></li>
        <li><Link to="/dashboard">Dashboard</Link></li>
      </ul>

      {/* Right Side */}
      <div className="nav-right">
        <button className="login-btn" onClick={handleLogin}>
          Login
        </button>
      </div>

    </nav>
  );
};

export default Navbar;