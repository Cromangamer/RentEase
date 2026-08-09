require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const rentalRoutes = require("./routes/rentalRoutes");
const maintenanceRoutes = require("./routes/maintenanceRoutes");

const app = express();

const PORT = process.env.PORT || 3000;

app.use(
  cors({
    origin: process.env.CLIENT_URL,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/health", (req, res) => {
  res.json({
    success: true,
    message: "Server is running",
  });
});
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/rentals", rentalRoutes);
app.use("/api/maintenance", maintenanceRoutes);

const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
};

startServer();