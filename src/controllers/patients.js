import Patients from "../models/patients";

function getPatient(req, res) {
  let patientId = req.params.patientId;

  Patients.findById(patientId, (err, patient) => {
    if (err)
      return res.status(500).send({
        message: `Error on request ${err}`
      });
    if (!patient)
      return res.status(404).send({
        message: `The patient does not exist`
      });

    res.status(200).send({
      patient: patient
    });
  });
}

function getPatients(req, res) {
  console.log(req.user);
  Patients.find({}, (err, patients) => {
    if (err) {
      return res.status(500).send({
        message: `Error on request ${err}`
      });
    }
    if (!patients) {
      return res.status(404).send({
        message: `There is not patients`
      });
    }
    res.status(200).send({
      patients: patients
    });
  });
}

function updatePatient(req, res) {
  let patientId = req.params.patientId;
  let update = req.body;

  Patients.findByIdAndUpdate(patientId, update, (err, patientUpdated) => {
    if (err) {
      res.status(500).send({
        message: `Error updating patient: ${err}`
      });
    }
    res.status(200).send({
      message: `The patient has been updated`,
      patient: patientUpdated
    });
  });
}

function postPatient(req, res) {
  let patient = new Patients();
  patient.name = req.body.name;
  patient.lastName = req.body.lastName;
  patient.doctorId = req.user;
  patient.video = req.body.video;
  patient.age = req.body.age;
  patient.sex = req.body.sex;
  patient.city = req.body.city;
  patient.grade = req.body.grade;

  patient.save((err, patientStored) => {
    if (err) {
      res.status(500).send({
        message: `Error saving on Database ${err}`
      });
    }

    res.status(200).send({
      patient: patientStored
    });
  });
}

function deletePatient(req, res) {
  let patientId = req.params.patientId;

  Patients.findById(patientId, (err, patient) => {
    if (err) {
      res.status(500).send({
        message: `Error deleting patient: ${err}`
      });
    }

    patient.remove(err => {
      if (err) {
        res.status(500).send({
          message: `Error deleting patient: ${err}`
        });
      }
      res.status(200).send({
        message: `The patient has been updated`
      });
    });
  });
}

module.exports = {
  getPatient,
  getPatients,
  updatePatient,
  postPatient,
  deletePatient
};
