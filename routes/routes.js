const session = require("express-session");
const express = require("express");
const userdb = require("../models/user");
const router = express.Router();

router.post("/login", userdb.checkLogin);
router.post("/signup", userdb.signup);
router.get("/session", userdb.getSession);

//gets the user if any is logged in
// router.get("/session", function(req, res) {
//   console.log(req.session);
//   if (req.session.userEmail) {
//     res.send({ name: req.session.fname, email: req.session.userEmail });
//   } else {
//     res.send({ email: null });
//   }
// });
router.post("/logout", function(req, res) {
  req.session = null;
});
module.exports = router;
