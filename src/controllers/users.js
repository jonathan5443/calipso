import User from "../graphql/users/model";
import Service from "../services";

function singUp(req, res) {
  if (!req.body.email || !req.body.password) {
    res.json({ success: false, message: "Please enter email and password." });
  } else {
    const newUser = new User({
      email: req.body.email,
      password: req.body.password
    });

    // Attempt to save the user
    newUser.save(function(err) {
      if (err) {
        return res.json({
          success: false,
          message: "That email address already exists."
        });
      }
      const token = Service.createToken(newUser);

      res.json({
        success: true,
        message: "Successfully created new user.",
        token
      });
    });
  }
}

function singIn(req, res) {
  User.findOne(
    {
      email: req.body.email
    },
    function(err, user) {
      if (err) throw err;

      if (!user) {
        res.send({
          success: false,
          message: "Authentication failed. User not found."
        });
      } else {
        // Check if password matches
        user.comparePassword(req.body.password, (err, isMatch) => {
          if (isMatch && !err) {
            // Create token if the password matched and no error was thrown
            const token = Service.createToken(user);
            res.json({ success: true, token });
          } else {
            res.send({
              success: false,
              message: "Authentication failed. Passwords did not match."
            });
          }
        });
      }
    }
  );
}

module.exports = {
  singUp,
  singIn
};
