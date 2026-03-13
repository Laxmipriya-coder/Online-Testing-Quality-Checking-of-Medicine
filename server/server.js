const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API Running");
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
app.post("/addSupplier", (req, res) => {

  const { supplier_name, contact, email, address } = req.body;

  const sql = "INSERT INTO supplier (supplier_name, contact, email, address) VALUES (?, ?, ?, ?)";

  db.query(sql, [supplier_name, contact, email, address], (err, result) => {

    if (err) {
      console.log(err);
      res.send("Error inserting data");
    } else {
      res.send("Supplier Added Successfully");
    }

  });

});
