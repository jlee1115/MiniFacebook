const session = require("express-session");
const express = require("express");
const router = express.Router();

router.post("/login", function(req, res) {
  console.log("in post");
});

module.exports = router;
