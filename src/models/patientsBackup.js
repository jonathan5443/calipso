import mongoose from "mongoose";
const Schema = mongoose.Schema;

const PatientBackupSchema = Schema({
  name: String,
  lastName: String,
  doctorId: String,
  video: String,
  age: Number,
  sex: {
    type: String,
    enum: ["M", "F"]
  },
  city: String,
  grade: String,
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("PatientBackup", PatientBackupSchema);
