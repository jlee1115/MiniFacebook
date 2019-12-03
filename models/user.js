const keyvaluestore = require("./keyvaluestore");
const users = new keyvaluestore("users");
const SHA3 = require("crypto-js/sha3");
const session = require("express-session");
users.init(function(err, data) {});

const check_login = function(req, res) {
  let email = req.body.user.userID;
  let password = req.body.user.password;
  users.get(email, function(err, data) {
    //user not found: err exists
    if (err) {
      res.send({ error: err });
    } else if (!data) {
      res.send({ error: "SOmething went wrong" });
    } else {
      let dataObj = data[0].value;
      let dataPW = JSON.parse(dataObj).password;
      //sends the password
      res.send({ error: null });
    }
  });
};
const signup = function(req, res) {
  let user = req.body.user;
  console.log(req.body.user);
  let fname = user.fname;
  let lname = user.lname;
  let password = user.password;
  let hashed = SHA3(password).toString();
  let birthday = user.birthday;
  let affil = user.affiliation;

  users.exists(user.email, function(err, data) {
    //already exists a user with that email
    if (data === true) {
      //err message
    } else {
      let newUser = JSON.stringify({
        fname: fname,
        lname: lname,
        birthday: birthday,
        password: hashed,
        affiliation: affil,
        interests: []
      });
      users.put(user.email, newUser, function(err2, data2) {
        //if error adding user
        if (err2) {
          //handle error putting shit in
        } else {
          //successfully put shit in
        }
      });
    }
  });
  console.log(newUser);
  //create the new user here.
};
const userdb = {
  checkLogin: check_login,
  signup: signup
};
module.exports = userdb;
