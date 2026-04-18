const express = require("express");
const router = express.Router();

const {
    scanMedicine,
    getScanHistory
} = require("../controllers/scanController");

// =========================
// HISTORY ROUTE (IMPORTANT FIRST)
// =========================
router.get("/history/all", getScanHistory);

// =========================
// SCAN ROUTE
// =========================
router.get("/:batch", scanMedicine);

module.exports = router;