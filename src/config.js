require("dotenv").config();
const config = require("../env.json")[process.env.NODE_ENV || "development"];

let DB_CONFIG;

if (process.env.NODE_ENV) {
  DB_CONFIG =
    process.env.NODE_ENV === "development"
      ? config.MONGO_URI + process.env.DB_NAME
      : `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${
          config.MONGO_URI
        }/${process.env.DB_NAME}`;
} else {
  DB_CONFIG = config.MONGO_URI + process.env.DB_NAME;
}

module.exports = {
  PORT: process.env.PORT || 3000,
  DB_CONFIG,
  SECRET_TOKEN: "essentials_top_secret"
};
