import React, { useEffect, useState } from "react";
import authFetch from "../utils/authFetch";

const ScanHistory = () => {
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchHistory = async () => {
        try {
            const res = await authFetch("/scan/history/all");

            setHistory(res.data || []);
        } catch (err) {
            console.error("History Error:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchHistory();
    }, []);

    if (loading) {
        return <h3>Loading history...</h3>;
    }

    return (
        <div style={{ padding: "20px" }}>
            <h2>📊 Scan History</h2>

            {history.length === 0 ? (
                <p>No scan history found</p>
            ) : (
                <table
                    border="1"
                    cellPadding="10"
                    style={{ width: "100%", marginTop: "20px" }}
                >
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Medicine</th>
                            <th>Batch</th>
                            <th>Status</th>
                            <th>Time</th>
                        </tr>
                    </thead>

                    <tbody>
                        {history.map((item) => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.medicine_name || "Unknown"}</td>
                                <td>{item.batch_number}</td>
                                <td>
                                    <span
                                        style={{
                                            color:
                                                item.status === "FOUND_IN_DB"
                                                    ? "green"
                                                    : item.status === "FOUND_IN_API"
                                                        ? "blue"
                                                        : "red",
                                            fontWeight: "bold",
                                        }}
                                    >
                                        {item.status}
                                    </span>
                                </td>
                                <td>
                                    {new Date(item.scanned_at).toLocaleString()}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default ScanHistory;