import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ResultPage = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const data = location.state;

    if (!data) {
        return (
            <div style={{ padding: "20px" }}>
                <h2>⚠ No Result Found</h2>
                <button onClick={() => navigate("/scan")}>
                    Go Back
                </button>
            </div>
        );
    }

    return (
        <div style={{ padding: "20px", maxWidth: "400px" }}>
            <h2>📄 Scan Result</h2>

            <div
                style={{
                    marginTop: "20px",
                    padding: "15px",
                    border: "1px solid #ddd",
                    borderRadius: "10px",
                }}
            >
                <p>
                    <b>Message:</b> {data.message}
                </p>

                <p>
                    <b>Medicine Name:</b>{" "}
                    {data.medicine_name || "Not Available"}
                </p>

                <p>
                    <b>Status:</b> {data.status}
                </p>
            </div>

            <button
                onClick={() => navigate("/scan")}
                style={{
                    marginTop: "20px",
                    padding: "10px",
                    width: "100%",
                    background: "black",
                    color: "white",
                }}
            >
                🔄 Scan Again
            </button>
        </div>
    );
};

export default ResultPage;