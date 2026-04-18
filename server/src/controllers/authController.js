const db = require("../config/db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.login = (req, res) => {
    const { email, password } = req.body;

    db.query("SELECT * FROM admin WHERE email=?", [email], async (err, result) => {

        if (err) {
            console.log("Login Error:", err);
            return res.status(500).json({ error: err.message });
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
            { id: user.admin_id },   // ⚠️ yaha bhi fix
            process.env.JWT_SECRET
        );

        res.json({ token });
    });
};