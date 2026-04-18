import { useEffect, useState } from "react";
import authFetch from "../utils/authFetch"; // ✅ FIXED

const Report = () => {
    const [reports, setReports] = useState([]);
    const [medicineId, setMedicineId] = useState("");
    const [status, setStatus] = useState("");

    // ✅ Fetch reports
    const fetchReports = () => {
        authFetch("/api/report") // ✅ FIXED URL
            .then(data => setReports(data))
            .catch(err => console.log("Fetch Error:", err));
    };

    useEffect(() => {
        fetchReports();
    }, []);

    // ✅ Add report
    const handleSubmit = async () => {
        try {
            await authFetch("/api/report", {
                method: "POST",
                body: JSON.stringify({
                    medicine_id: medicineId,
                    status
                })
            });

            fetchReports();
        } catch (err) {
            console.log("Submit Error:", err);
        }
    };

    return (
        <div>
            <h2>Reports</h2>

            <input
                placeholder="Medicine ID"
                value={medicineId}
                onChange={(e) => setMedicineId(e.target.value)}
            />

            <input
                placeholder="Status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
            />

            <button onClick={handleSubmit}>Add Report</button>

            <table border="1">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Medicine</th>
                        <th>Status</th>
                        <th>Date</th>
                    </tr>
                </thead>

                <tbody>
                    {reports.map((r) => (
                        <tr key={r.report_id}>
                            <td>{r.report_id}</td>
                            <td>{r.medicine_id}</td>
                            <td>{r.status || "N/A"}</td>
                            <td>{r.report_date || "N/A"}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Report;