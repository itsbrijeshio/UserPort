require("dotenv").config();

const env = {
  PORT: process.env.PORT || 3000,
  NODE_ENV: process.env.NODE_ENV || "development",
  MONGO_URI: process.env.MONGO_URI,
  JWT_SECRET: process.env.JWT_SECRET || "jwt_secret",
  JWT_EXPIRES: process.env.JWT_EXPIRES || "1h",
  CRON_SCHEDULE: process.env.CRON_SCHEDULE || "0 */30 * * * *",
};

module.exports = env;
