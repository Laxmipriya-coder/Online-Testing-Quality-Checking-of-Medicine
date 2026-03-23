import React from "react";
import "./dashboard.css";

const Dashboard = () => {
  return (
    <div className="dashboard">
      <h1 className="title">Admin Dashboard</h1>

      <div className="cards">
        <div className="card">
          <h3>Total Reports</h3>
          <p>128</p>
        </div>

        <div className="card">
          <h3>Unsafe Medicines</h3>
          <p className="danger">Augmentin-G453</p>
        </div>

        <div className="card">
          <h3>Safe Medicines</h3>
          <p className="safe">320</p>
        </div>
      </div>

      <div className="charts">
        <div className="chart-box">
          <h3>Reports Overview</h3>
          <div className="bar-chart">
            <div style={{ height: "40%" }}></div>
            <div style={{ height: "60%" }}></div>
            <div style={{ height: "80%" }}></div>
            <div style={{ height: "50%" }}></div>
          </div>
        </div>

        <div className="chart-box">
          <h3>Statistics</h3>
          <div className="pie-chart"></div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;