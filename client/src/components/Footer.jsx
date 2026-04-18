import React, { useState, useEffect } from "react";
import "./footer.css";
import { FaFacebook, FaTwitter, FaLinkedin, FaGithub } from "react-icons/fa";
import logo from "../images/logo.png";

const Footer = ({ darkMode, setDarkMode }) => {

  return (
    <footer className="footer">
      <div className="footer-container">

        {/* Brand */}
        <div className="footer-section">
          <div className="logo-section" onClick={() => navigate("/")}>
                 <img src={logo} alt="logo" />
                 <span className="brand">MediVerify</span>
               </div>
         
          <p>
            Smart medicine verification platform ensuring safety,
            quality, and reliability in healthcare systems.
          </p>

          {/* Social Icons */}
          <div className="social-icons">
            <a href="#"><FaFacebook /></a>
            <a href="#"><FaTwitter /></a>
            <a href="#"><FaLinkedin /></a>
            <a href="#"><FaGithub /></a>
          </div>
        </div>

        {/* Links */}
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="/dashboard">Dashboard</a></li>
            <li><a href="/medicines">Medicines</a></li>
            <li><a href="/reports">Reports</a></li>
            <li><a href="/profile">Profile</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div className="footer-section">
          <h3>Contact</h3>
          <p>Email: support@mediverify.com</p>
          <p>Phone: +91 9871891523</p>
          <p>
            <a 
              href="https://www.google.com/maps?q=India" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              📍 View Location
            </a>
          </p>
        </div>

        {/* Theme Toggle */}
        <div className="footer-section">
          <h3>Theme</h3>
          <button 
            className="toggle-btn"
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? "☀ Light Mode" : "🌙 Dark Mode"}
          </button>
        </div>

      </div>

      {/* Bottom */}
      <div className="footer-bottom">
        <p>©️ {new Date().getFullYear()} Mediverify. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;