import React from "react";
import "./HomePage.css";
import MedicineSection from "../components/MedicineSection";

const HomePage = () => {
  return (
    <>
      {/* HERO SECTION */}
      <section className="hero">

        <div className="hero-content">

          <h1 className="fade-in">
            Medicine & Consumable <br /> Quality Testing
          </h1>

          <p className="fade-in delay">
            Monitor, analyze and ensure the safety and authenticity 
            of medicines and healthcare consumables.
          </p>

          <div className="hero-buttons fade-in delay2">
            <button className="primary-btn">Start Testing</button>
            <button className="secondary-btn">View Reports</button>
          </div>

          {/* Stats Section */}
          <div className="hero-stats fade-in delay3">
            <div>
              <h3>10K+</h3>
              <p>Tests Done</p>
            </div>
            <div>
              <h3>5K+</h3>
              <p>Users</p>
            </div>
            <div>
              <h3>99%</h3>
              <p>Accuracy</p>
            </div>
          </div>

        </div>

      </section>

      {/* 👇 YEH NAYA SECTION ADD HUA */}
      <MedicineSection />
    </>
  );
};

export default HomePage;