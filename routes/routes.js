const session = require("express-session");
const express = require("express");
const router = express.Router();

router.post("/login", function(req, res) {
  console.log("in post");
  res.send("yay from routes");
});
router.post("/signup", function(req, res) {
  console.log("in post signup");
});

module.exports = router;
