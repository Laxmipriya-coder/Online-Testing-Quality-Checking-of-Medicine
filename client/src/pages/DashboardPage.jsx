import React, { useEffect, useState } from "react";
import authFetch from "../utils/authFetch";
import { Bar } from "react-chartjs-2";

// ✅ Chart.js register (VERY IMPORTANT)
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const DashboardPage = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await authFetch("/dashboard"); // ✅ correct URL
        console.log("Dashboard:", res);
        setData(res); // ✅ full data (stats + activities)
      } catch (err) {
        console.error("Dashboard Error:", err);
      }
    };

    fetchDashboard();
  }, []);

  // ✅ loading check
  if (!data || !data.stats) {
    return <h2 style={{ textAlign: "center" }}>Loading...</h2>;
  }

  // ✅ Chart Data
  const chartData = {
    labels: ["Tests", "Users", "Reports"],
    datasets: [
      {
        label: "Dashboard Stats",
        data: [
          data.stats.totalTests,
          data.stats.users,
          data.stats.reports
        ],
      },
    ],
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ marginBottom: "20px" }}>Dashboard</h2>

      {/* 🔥 CARDS */}
      <div
        style={{
          display: "flex",
          gap: "20px",
          flexWrap: "wrap"
        }}
      >
        <div style={cardStyle}>
          <h3>{data.stats.totalTests ?? 0}</h3>
          <p>Total Tests</p>
        </div>

        <div style={cardStyle}>
          <h3>{data.stats.users ?? 0}</h3>
          <p>Users</p>
        </div>

        <div style={cardStyle}>
          <h3>{data.stats.reports ?? 0}</h3>
          <p>Reports</p>
        </div>
      </div>

      {/* 📊 CHART */}
      <div style={{ marginTop: "40px" }}>
        <Bar key={JSON.stringify(chartData)} data={chartData} />
      </div>

      {/* 📋 ACTIVITY */}
      <h3 style={{ marginTop: "30px" }}>Recent Activity</h3>

      <ul>
        {data.activities?.length > 0 ? (
          data.activities.map((item, index) => (
            <li key={index}>
              {item.medicine_name || "Medicine"} - {item.result || "Result"}
            </li>
          ))
        ) : (
          <p>No recent activity</p>
        )}
      </ul>
    </div>
  );
};

// 🎨 Card Style
const cardStyle = {
  flex: "1",
  minWidth: "200px",
  padding: "20px",
  borderRadius: "12px",
  background: "#1e293b",
  color: "white",
  boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
  textAlign: "center"
};

export default DashboardPage;