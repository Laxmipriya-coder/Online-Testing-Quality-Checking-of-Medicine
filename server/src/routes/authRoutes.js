const express = require("express");
const router = express.Router();
const db = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


// 🔵 TEST ROUTE (check if file loaded)
router.get("/", (req, res) => {
    res.send("Auth API working ✅");
});


// 🔵 SIGNUP ROUTE
router.post("/signup", async (req, res) => {
    const { email, password } = req.body;

    // validation
    if (!email || !password) {
        return res.status(400).json({ message: "Email and password required" });
    }

    // check DB connection first
    if (!db) {
        return res.status(500).json({ message: "Database not connected" });
    }

    db.query("SELECT * FROM admin WHERE email = ?", [email], async (err, result) => {
        if (err) {
            console.log("DB Error:", err);
            return res.status(500).json({ error: "Database error" });
        }

        // user exists
        if (result.length > 0) {
            return res.status(409).json({ message: "User already exists" });
        }

        try {
            const hashedPassword = await bcrypt.hash(password, 10);

            db.query(
                "INSERT INTO admin (email, password) VALUES (?, ?)",
                [email, hashedPassword],
                (err, data) => {
                    if (err) {
                        console.log("Insert Error:", err);
                        return res.status(500).json({ error: "Insert failed" });
                    }

                    return res.status(201).json({
                        message: "Signup successful ✅"
                    });
                }
            );

        } catch (error) {
            console.log("Signup Error:", error);
            res.status(500).json({ error: "Server error" });
        }
    });
});


// 🔵 LOGIN ROUTE
router.post("/login", (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Email and password required" });
    }

    db.query("SELECT * FROM admin WHERE email=?", [email], async (err, result) => {
        if (err) {
            console.log("Login DB Error:", err);
            return res.status(500).json({ error: "Database error" });
        }

        if (result.length === 0) {
            return res.status(401).json({ message: "User not found" });
        }

        const user = result[0];

        const match = await bcrypt.compare(password, user.password);

        if (!match) {
            return res.status(401).json({ message: "Wrong password" });
        }

        const token = jwt.sign(
            { id: user.admin_id },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        res.json({
            message: "Login successful",
            token
        });
    });
});

module.exports = router;