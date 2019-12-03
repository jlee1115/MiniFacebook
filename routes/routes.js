const session = require("express-session");
const express = require("express");
const userdb = require("../models/user");
const router = express.Router();

router.post("/login", function(req, res) {
  console.log("in post");
  res.send("yay from routes");
});
router.post("/signup", userdb.signup);
// router.post("/signup", function (req, res) {
//   userdb.signup()
//   console.log("in post signup");
// });

module.exports = router;
