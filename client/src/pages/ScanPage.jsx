import React from "react";
import "./ScanPage.css";

const ScanPage = () => {
  return (
    <div className="home-container">
      <div className="search-bar">
        <input type="text" placeholder="Search for Medicine..." />
        <button className="scan-btn">📷 Scan Medicine</button>
      </div>

      <div className="alert-box">
        <h3>⚠️ Alerts: Recent Unsafe Medicines</h3>

        <div className="alert-item">
          ❗ <b>Augmentin</b> - Batch 4563: Contamination Alert!
        </div>

        <div className="alert-item">
          ❗ <b>Ranitidine</b> - Recalled due to impurities
        </div>
      </div>
    </div>
  );
};

export default ScanPage;