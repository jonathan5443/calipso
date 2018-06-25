require("dotenv").config();
const config = require("../env.json")[process.env.NODE_ENV || "development"];

let DB_CONFIG;

// DB_CONFIG = `mongodb://calipso:calipso01@ds251985.mlab.com:51985/calipso`;
DB_CONFIG = config.MONGO_URI + process.env.DB_NAME;

module.exports = {
  PORT: process.env.PORT || 3000,
  DB_CONFIG,
  SECRET_TOKEN: "calipso_top_secret"
};
