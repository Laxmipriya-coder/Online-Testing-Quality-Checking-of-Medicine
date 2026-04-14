import React from "react";
import "./Dashboard.css";

const DashboardPage = () => {
  return (
    <div className="dashboard">

      {/* Heading */}
      <h2 className="dashboard-title">Dashboard</h2>

      {/* Stats Cards */}
      <div className="stats-container">

        <div className="card">
          <h3>10,245</h3>
          <p>Total Tests</p>
        </div>

        <div className="card">
          <h3>5,320</h3>
          <p>Users</p>
        </div>

        <div className="card">
          <h3>98.7%</h3>
          <p>Accuracy</p>
        </div>

        <div className="card">
          <h3>120</h3>
          <p>Reports Generated</p>
        </div>

      </div>

      {/* Recent Activity */}
      <div className="activity-section">
        <h3>Recent Activity</h3>

        <table>
          <thead>
            <tr>
              <th>Test ID</th>
              <th>Medicine</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>#1023</td>
              <td>Paracetamol</td>
              <td className="success">Safe</td>
              <td>14 Apr 2026</td>
            </tr>

            <tr>
              <td>#1022</td>
              <td>Ibuprofen</td>
              <td className="warning">Check</td>
              <td>13 Apr 2026</td>
            </tr>

            <tr>
              <td>#1021</td>
              <td>Amoxicillin</td>
              <td className="danger">Unsafe</td>
              <td>12 Apr 2026</td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default DashboardPage;