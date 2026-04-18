const express = require("express");
const router = express.Router();
const db = require("../config/db");
const authMiddleware = require("../middleware/authMiddleware");


// 🔵 DASHBOARD DATA
router.get("/", authMiddleware, (req, res) => {

    const query = `
        SELECT 
        (SELECT COUNT(*) FROM quality_test) AS totalTests,
        (SELECT COUNT(*) FROM admin) AS users,
        (SELECT COUNT(*) FROM report) AS reports
    `;

    db.query(query, (err, stats) => {
        if (err) {
            console.log("Dashboard Error:", err);
            return res.status(500).json({ error: "Database error" });
        }

        db.query(
            "SELECT * FROM report ORDER BY report_date DESC LIMIT 5",
            (err, activity) => {

                if (err) {
                    console.log("Activity Error:", err);
                    return res.status(500).json({ error: "Database error" });
                }

                res.json({
                    stats: stats[0],
                    activities: activity || []
                });
            }
        );
    });
});

module.exports = router;