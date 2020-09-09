const router = require("express").Router();
const User = require("../db").import("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const validateSession = require("../middleware/validate-session");
// USER SIGNUP //
router.post("/create", function (req, res) {
  User.create({
    email: req.body.user.email,
    username: req.body.user.username,
    password: bcrypt.hashSync(req.body.user.password, 12),
    role: req.body.user.role,
  })
    .then(function createSuccess(user) {
      // Update code
      let token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: 60 * 60 * 24,
      });

      res.json({
        user: user.username,
        message: "User successfully created!",
        sessionToken: token,
      });
    })
    .catch((err) => res.status(500).json({ error: err }));
});

//*************************************************************************************************************************************************** */
//*************************************************************************************************************************************************** */

// USER LOGIN //
router.post("/login", function (req, res) {
  console.log("yah yeet");
  User.findOne({
    where: {
      email: req.body.user.email,
    },
  })
    .then(function loginSuccess(user) {
      if (user) {
        bcrypt.compare(req.body.user.password, user.password, function (
          err,
          matches
        ) {
          if (matches) {
            let token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
              expiresIn: 60 * 60 * 24,
            });
            res.status(200).json({
              user: user,
              message: "User successfully logged in!",
              sessionToken: token,
            });
          } else {
            res.status(502).send({ error: "Login Failed" });
          }
        });
      } else {
        res.status(500).json({ error: "User does not exist." });
      }
    })
    .catch((err) => res.status(500).json({ error: err }));
});

//Get all
router.get("/", (req, res) => {
  User.findAll()
    .then((users) => res.status(200).json(users))
    .catch((err) => res.status(500).json({ error: err }));
});

router.get("/1", validateSession, (req, res) => {
  let userId = req.user.id;
  User.findAll({
    where: { userId: userId },
  })
    .then((users) => res.status(200).json(users))
    .catch((err) => res.status(500).json({ error: err }));
});
module.exports = router;
