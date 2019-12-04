const keyvaluestore = require("./keyvaluestore");
const users = new keyvaluestore("users");
const SHA3 = require("crypto-js/sha3");
const session = require("express-session");
users.init(function(err, data) {});

const check_login = function(req, res) {
  let email = req.body.user.email;
  let password = req.body.user.password;
  console.log("PW", password);
  users.get(email, function(err, data) {
    //user not found: err exists
    if (err) {
      console.log(err);
      return res.send({ error: err.message });
    } else if (!data) {
      return res.send({ error: "Something went wrong" });
    } else {
      let dataObj = data[0].value;
      let dataPW = JSON.parse(dataObj).password;

      let hashed = SHA3(password).toString();
      console.log("datapw", dataPW);
      console.log("hashed", hashed);
      if (hashed !== dataPW) {
        return res.send({ error: "Wrong Password" });
      }
      req.session.userEmail = email;
      req.session.fname = "placeholder lol";
      //sends no error
      return res.send({ error: null });
    }
  });
};
const signup = function(req, res) {
  let user = req.body.user;
  console.log(req.body.user);
  let fname = user.fname;
  let lname = user.lname;
  let password = user.password;
  //so something is weird with the password hash
  let hashed = SHA3(password).toString();
  let birthday = user.birthday;
  let affil = user.affiliation;
  console.log("email", String(user.email));

  users.exists(user.email, function(err, data) {
    //already exists a user with that email
    if (data === true) {
      //err message
      res.send({ error: "User with email exists" });
    } else {
      let newUser = JSON.stringify({
        fname: fname,
        lname: lname,
        birthday: birthday,
        password: hashed,
        affiliation: affil,
        interests: user.interests
      });
      users.put(String(user.email), newUser, function(err2, data2) {
        //if error adding user
        if (err2) {
          //handle error putting shit in
          return res.send({ error: err2 });
          console.log(err2);
        } else {
          //successfully put shit in, update the session
          req.session.userEmail = user.email;
          req.session.fname = fname;
          return res.send({ error: null });
        }
      });
    }
  });
  //create the new user here.
};
const userdb = {
  checkLogin: check_login,
  signup: signup
};
module.exports = userdb;
