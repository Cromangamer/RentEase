const mongoose = require("mongoose");

const mongoUri =
  process.env.MONGO_URI || "mongodb://127.0.0.1:27017/rentease";

const connectDB = async () => {
  try {
    await mongoose.connect(mongoUri);

    console.log("✅ MongoDB Connected");
  } catch (err) {
    console.error("❌ Database Error:", err.message);
    process.exit(1);
  }
};

module.exports = connectDB;