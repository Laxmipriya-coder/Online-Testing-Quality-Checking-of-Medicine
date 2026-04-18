const express = require("express");
const router = express.Router();
const db = require("../config/db");

// Get reports
router.get("/", (req, res) => {
    db.query("SELECT * FROM report", (err, data) => {
        if (err) return res.status(500).json(err);
        res.json(data);
    });
});

// Add report
router.post("/", (req, res) => {
    const { medicine_id, status } = req.body;

    if (!medicine_id || !status)
        return res.status(400).json({ message: "Fill all fields" });

    db.query(
        "INSERT INTO report (medicine_id, status, date) VALUES (?, ?, NOW())",
        [medicine_id, status],
        (err) => {
            if (err) return res.status(500).json(err);
            res.json({ message: "Report added" });
        }
    );
});

module.exports = router;