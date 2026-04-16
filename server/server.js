const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();

app.use(cors());
app.use(express.json());

/* ---------------- ROOT ---------------- */
app.get("/", (req, res) => {
  res.send("API Running");
});

/* ---------------- ADD SUPPLIER ---------------- */
app.post("/addSupplier", (req, res) => {
  const { supplier_name, contact, email, address } = req.body;

  const sql =
    "INSERT INTO supplier (supplier_name, contact, email, address) VALUES (?, ?, ?, ?)";

  db.query(sql, [supplier_name, contact, email, address], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error inserting data");
    } else {
      res.send("Supplier Added Successfully");
    }
  });
});

/* ---------------- PRODUCT SCAN API (NEW 🔥) ---------------- */
app.get("/product/:barcode", (req, res) => {
  const barcode = req.params.barcode;

  const sql = "SELECT * FROM products WHERE barcode = ?";

  db.query(sql, [barcode], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ success: false });
    }

    if (result.length > 0) {
      res.json({
        success: true,
        data: result[0]
      });
    } else {
      res.json({
        success: false,
        message: "Product not found"
      });
    }
  });
});

/* ---------------- SERVER START ---------------- */
app.listen(5000, () => {
  console.log("Server running on port 5000");
});