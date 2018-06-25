import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";

import Auth from "./middlewares/auth";
import UserController from "./controllers/users";

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

app.use(Auth);

// Test users
// Register new users
app.post("/signup", UserController.singUp);

// Authenticate the user and get a JSON Web Token to include in the header of future requests.
app.post("/signin", UserController.singIn);

// Protect dashboard route with JWT
app.get("/dashboard", Auth, function(req, res) {
  res.send("It worked! User id is: " + req.user + ".");
});

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
