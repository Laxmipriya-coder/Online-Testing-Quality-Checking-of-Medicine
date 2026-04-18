import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import "./Navbar.css";
import logo from "../images/logo.png";

const Navbar = ({ darkMode, setDarkMode }) => {
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userRole = localStorage.getItem("role");

    setIsLoggedIn(!!token);
    setRole(userRole);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <nav className="navbar">

      {/* LOGO */}
      <div className="logo-section" onClick={() => navigate("/")}>
        <img src={logo} alt="logo" />
        <span className="brand">MediVerify</span>
      </div>

      {/* LINKS */}
      <ul className={`nav-links ${menuOpen ? "active" : ""}`}>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/scan">Scan</Link></li>
        <li><Link to="/report">Report</Link></li>
        <li><Link to="/dashboard">Dashboard</Link></li>
        <li><Link to="/medicine">Medicine</Link></li>

        {/* 🔥 ADMIN ONLY */}
        {role === "admin" && (
          <li><Link to="/admin">Admin</Link></li>
        )}
      </ul>

      {/* SEARCH */}
      <div className="search-box">
        <input
          type="text"
          placeholder="Search medicines..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button><FiSearch /></button>
      </div>

      {/* RIGHT SIDE */}
      <div className="nav-right">

  {isLoggedIn ? (
    <button className="logout-btn" onClick={handleLogout}>
      Logout
    </button>
  ) : (
    <div className="auth-buttons">
      <button className="login-btn" onClick={() => navigate("/login")}>
        Login
      </button>

      <button className="signup-btn" onClick={() => navigate("/signup")}>
        Sign Up
      </button>
    </div>
  )}

</div>

      {/* MOBILE */}
      <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        ☰
      </div>

    </nav>
  );
};

export default Navbar;