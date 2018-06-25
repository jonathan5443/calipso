const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// Schema defines how the user's data will be stored in MongoDB
const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    lowercase: true,
    unique: true,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  documentType: {
    type: String,
    required: true,
    enum: ["CC", "CE", "Passport", "NIT"]
  },
  documentNumber: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ["Client", "Manager", "Admin"],
    default: "Client"
  }
});

// Saves the user's password hashed (plain text password storage is not good)
UserSchema.pre("save", function(next) {
  var user = this;
  if (this.isModified("password") || this.isNew) {
    bcrypt.genSalt(10, function(err, salt) {
      if (err) {
        return next(err);
      }
      bcrypt.hash(user.password, salt, function(err, hash) {
        if (err) {
          return next(err);
        }
        user.password = hash;
        next();
      });
    });
  } else {
    return next();
  }
});

// Create method to compare password input to password saved in database
UserSchema.methods.comparePassword = function(pw, cb) {
  bcrypt.compare(pw, this.password, function(err, isMatch) {
    if (err) {
      return cb(err);
    }
    cb(null, isMatch);
  });
};

module.exports = mongoose.model("User", UserSchema);
