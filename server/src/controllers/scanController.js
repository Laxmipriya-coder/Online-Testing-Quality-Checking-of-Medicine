const db = require("../config/db");
const axios = require("axios");

const scanMedicine = (req, res) => {
    const { batch } = req.params;

    // =========================
    // 1. CHECK IN DATABASE
    // =========================
    db.query(
        `SELECT * FROM medicine WHERE batch_number = ?`,
        [batch],
        async (err, results) => {

            if (err) {
                console.log(err);
                return res.status(500).json({ message: "DB Error" });
            }

            // ✅ FOUND IN DB
            if (results.length > 0) {
                const medicine = results[0];

                // save scan history
                db.query(
                    `INSERT INTO scan_history (medicine_id, batch_number, status)
                     VALUES (?, ?, ?)`,
                    [medicine.medicine_id, batch, "FOUND_IN_DB"]
                );

                return res.json({
                    success: true,
                    source: "DB",
                    medicine_name: medicine.medicine_name,
                    status: "VALID"
                });
            }

            // =========================
            // 2. CALL RXNORM API
            // =========================
            let medicineName = null;

            try {
                const response = await axios.get(
                    `https://rxnav.nlm.nih.gov/REST/drugs.json?name=${batch}`
                );

                const groups = response.data?.drugGroup?.conceptGroup;

                if (groups) {
                    for (let g of groups) {
                        if (g.conceptProperties?.length) {
                            medicineName = g.conceptProperties[0].name;
                            break;
                        }
                    }
                }

            } catch (apiErr) {
                console.log("API Error:", apiErr.message);
            }

            // =========================
            // 3. FOUND IN API → SAVE DB
            // =========================
            if (medicineName) {

                db.query(
                    `INSERT INTO medicine (batch_number, medicine_name)
                     VALUES (?, ?)`,
                    [batch, medicineName],
                    (err, result) => {

                        if (err) {
                            console.log(err);
                            return;
                        }

                        const medicineId = result.insertId;

                        // save scan history
                        db.query(
                            `INSERT INTO scan_history (medicine_id, batch_number, status)
                             VALUES (?, ?, ?)`,
                            [medicineId, batch, "FOUND_IN_API"]
                        );
                    }
                );

                return res.json({
                    success: true,
                    source: "API",
                    medicine_name: medicineName,
                    status: "NEW_SAVED"
                });
            }

            // =========================
            // 4. NOT FOUND
            // =========================
            return res.status(404).json({
                success: false,
                message: "❌ Invalid medicine / Not found"
            });
        }
    );
};

// =========================
// SCAN HISTORY API
// =========================
const getScanHistory = (req, res) => {

    const sql = `
        SELECT 
            sh.id,
            sh.batch_number,
            sh.status,
            sh.scanned_at,
            m.medicine_name
        FROM scan_history sh
        LEFT JOIN medicine m 
        ON sh.medicine_id = m.medicine_id
        ORDER BY sh.scanned_at DESC
    `;

    db.query(sql, (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ message: "DB Error" });
        }

        res.json({
            success: true,
            data: results
        });
    });
};

module.exports = {
    scanMedicine,
    getScanHistory
};