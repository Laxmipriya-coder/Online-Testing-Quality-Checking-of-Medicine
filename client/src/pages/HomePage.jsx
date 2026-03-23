import React from "react";
import "./HomePage.css";

const HomePage = () => {
  return (
    <div className="hero">

      <div className="hero-content">
        <h1>
          Medicine & Consumable <br /> Quality Testing
        </h1>

        <p>
          Monitor, analyze and ensure the safety and authenticity 
          of medicines and healthcare consumables.
        </p>

        <div className="hero-buttons">
          <button className="primary-btn">Start Testing</button>
          <button className="secondary-btn">View Reports</button>
        </div>
      </div>

    </div>
  );
};

export default HomePage;