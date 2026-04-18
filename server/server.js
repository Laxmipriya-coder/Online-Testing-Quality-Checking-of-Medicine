const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();


// 🔵 Middlewares
app.use(cors());
app.use(express.json());


// 🔵 Test Route
app.get("/", (req, res) => {
  res.send("Backend running 🚀");
});


// 🔵 Routes
app.use("/api/auth", require("./src/routes/authRoutes"));
app.use("/api/medicine", require("./src/routes/medicineRoutes"));
app.use("/api/report", require("./src/routes/reportRoutes"));
app.use("/api/scan", require("./src/routes/scanRoutes"));
app.use("/api/dashboard", require("./src/routes/dashboardRoutes"));


// 🔵 404 Handler
app.use((req, res) => {
  res.status(404).json({ message: "Route not found ❌" });
});


// 🔵 Global Error Handler (recommended)
app.use((err, req, res, next) => {
  console.error("Server Error:", err);
  res.status(500).json({ message: "Internal Server Error ❌" });
});


// 🔵 Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running 🚀 on port ${PORT}`);
});