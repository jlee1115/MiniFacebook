const session = require("express-session");
const express = require("express");
const userdb = require("../models/user");
const postdb = require("../models/post");
const router = express.Router();

//USER functions
//logins in
router.post("/login", userdb.checkLogin);
//signs up
router.post("/signup", userdb.signup);
//gets the logged in user
router.get("/session", userdb.getSession);
//logs the user out
router.post("/logout", function(req, res) {
  req.session.userID = null;
  res.send({ error: false });
});
router.get("/getUser", userdb.getUserPage);

//POST functions
router.get("/userPosts", postdb.getUserPosts);
router.post("/addPost", postdb.addPost);
router.post("/allPosts", postdb.getPosts);
module.exports = router;
