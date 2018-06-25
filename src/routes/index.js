import express from "express";
import patientCtrl from "../controllers/patients";
import userCtrl from "../controllers/users";
import auth from "../middlewares/auth";

const api = express.Router();

api.get("/patient", auth, patientCtrl.getPatients);
api.get("/patient/:patientId", auth, patientCtrl.getPatient);
api.post("/patient", auth, patientCtrl.postPatient);
api.put("/patient/:patientId", auth, patientCtrl.updatePatient);
api.delete("/patient/:patientId", auth, patientCtrl.deletePatient);
api.post("/signup", userCtrl.singUp);
api.post("/signin", userCtrl.singIn);
// To test if the authorization is working
api.get("/private", auth, function(req, res) {
  res.status(200).send({
    message: "It worked! User id is: " + req.user + "."
  });
});

module.exports = api;
