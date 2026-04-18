const express = require("express");
const router = express.Router();
const db = require("../config/db");

router.get("/", (req, res) => {

    const query = `
    SELECT 
    (SELECT COUNT(*) FROM quality_test) AS totalTests,
    (SELECT COUNT(*) FROM admin) AS users,
    (SELECT COUNT(*) FROM report) AS reports
    `;

    db.query(query, (err, stats) => {

        if (err) {
            console.log("Dashboard Error:", err);
            return res.status(500).json({ error: err });
        }

        db.query(`
            SELECT r.report_id, r.report_date, r.remarks,
                   q.status,
                   m.medicine_name
            FROM report r
            LEFT JOIN quality_test q ON r.test_id = q.test_id
            LEFT JOIN medicine m ON q.medicine_id = m.medicine_id
            ORDER BY r.report_date DESC
            LIMIT 5
        `, (err, activity) => {

            if (err) {
                console.log("Activity Error:", err);
                return res.status(500).json({ error: err });
            }

            res.json({
                stats: stats[0],
                activities: activity
            });
        });

    });
});

module.exports = router;