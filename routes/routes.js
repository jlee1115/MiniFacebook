const session = require("express-session");
const express = require("express");
const userdb = require("../models/user");
const router = express.Router();

router.post("/login", function(req, res) {
  console.log("in post");
  res.send("yay from routes");
});
router.post("/signup", userdb.signup);

//gets the user if any is logged in
router.get("/session", function(req, res) {
  if (req.session.userEmail) {
    res.send({ name: req.session.fname });
  } else {
    res.send(null);
  }
});

module.exports = router;
