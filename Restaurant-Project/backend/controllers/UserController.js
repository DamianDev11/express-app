const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const jwtExpireTime = 24 * 60 * 60;

exports.registerUser = (req, res) => {
  User.findOne({
    email: req.body.email,
  }).then((user) => {
    if (user) {
      return res.status(400).json({ email: "Email already registered" }); //id email already used to create account
    } else {
      const newUser = new User({
        // if new email is entered
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        role: "user",
      });

      bcrypt.genSalt(10, (err, salt) => {
        if (err) {
          console.log("There is an error" + err);
        } else {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) {
              console.log("There is an error" + err);
            } else {
              newUser.password = hash;
              newUser.save().then((user) => {
                console.log("Registered successfully!");
                return res.json(user);
              });
            }
          });
        }
      });
    }
  });
};

//for users who have account already created
exports.loginUser = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email }).then((user) => {
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (isMatch) {
        const payload = {
          id: user.id,
          name: user.name,
          role: user.role,
        };
        jwt.sign(
          payload,
          process.env.SECRET_KEY,
          { expiresIn: jwtExpireTime },
          (err, token) => {
            if (err) console.log("There is an error in JWT", err);
            else {
              console.log("Login successfully", payload);
              res.json({
                success: true,
                token: `Bearer ${token}`,
              });
            }
          }
        );
      } else {
        return res.status(400).json({ message: "Invalid Credentials" });
      }
    });
  });
};
