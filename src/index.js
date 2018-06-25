import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";

import api from "./routes";

mongoose.Promise = global.Promise;

const config = require("./config");
const app = express();

// Use body-parser to get POST requests for API use
app.use(bodyParser.urlencoded({ extended: false }));

// Use cors for all origins
app.use(cors());

app.get("/", (req, res) => {
  res.send({ message: "Calipso API" });
});

app.use(bodyParser.json());
app.use("/api", api);

mongoose
  .connect(
    config.DB_CONFIG,
    { useMongoClient: true }
  )
  .then(() => {
    console.log(`DB Connection successful`);
    app.listen(config.PORT, () => {
      console.log(`Essentials server runing in port ${config.PORT}`);
    });
  })
  .catch(err => {
    console.log(`Error of DB connection ${err}`);
  });
