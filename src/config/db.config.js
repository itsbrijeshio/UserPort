const mongoose = require("mongoose");
const env = require("../config/env.config");

const connectDB = async () => {
  try {
    await mongoose.connect(env.MONGO_URI);
    console.warn("DB Connected Successfully");
  } catch (error) {
    console.error("DB Connection Error:", error);
    process.exit(1);
  }
};

module.exports = connectDB;
