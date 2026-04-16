import React, { useState } from "react";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import "./navbar.css";
import logo from "../images/logo.png";

const Navbar = ({ darkMode, setDarkMode }) => {
  useEffect(() => {
  document.body.classList.remove("dark", "light");
  document.body.classList.add(darkMode ? "dark" : "light");
}, [darkMode]);

  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState("");

  // ✅ LOGIN FUNCTION (FIXED)
  const handleLogin = () => {
    navigate("/login");
  };

  // SEARCH
  const handleKeyPress = (e) => {
  if (e.key === "Enter") {
    handleSearchSubmit();
  }
};
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };
  const handleSearchSubmit = () => {
    if(search.trim()){
      navigate(`/search?query=${search}`);
    }
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
      </ul>

      {/* SEARCH BOX */}
      <div className="search-box">
        <input
          type="text"
          placeholder="Search medicines, Consumables..."
          value={search}
          onChange={handleSearch}
          onKeyDown={handleKeyPress}
        />

        <button onClick={handleSearchSubmit}>
          <FiSearch />
        </button>
      </div>

      {/* RIGHT SIDE */}
      <div className="nav-right">

        {/* LOGIN BUTTON (FIXED) */}
        <button className="login-btn" onClick={handleLogin}>
          Login
        </button>

      </div>

      {/* MOBILE MENU */}
      <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        ☰
      </div>

    </nav>
  );
};

export default Navbar;