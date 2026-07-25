const dotenv = require("dotenv");
dotenv.config();

const envConfig = {
  DB_URL: process.env.DB_URL,
  PORT: process.env.PORT,
  BASE_URL: process.env.BASE_URL,
  SALT_ROUND: process.env.SALT_ROUND,
  SMTP_PASS: process.env.SMTP_PASS,
  SMTP_USER: process.env.SMTP_USER,
  jwt_access_secret: process.env.ACC_SEC
};

module.exports = envConfig;