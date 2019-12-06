const keyvaluestore = require("./keyvaluestore");
const users = new keyvaluestore("users");
const SHA3 = require("crypto-js/sha3");
const session = require("express-session");
users.init(function(err, data) {});

const get_session = function(req, res) {
  console.log("in get");
  console.log(req.session);
  // let userID = req.session.userEmail;
  let userID = "jleeupenn";
  if (userID) {
    // res.setHeader("Content-Type", "text/plain");
    // res.setHeader("Content-Length", body.length);
    users.get(userID, function(err, data) {
      if (err) {
        return res.send({ error: err.message });
      } else if (!data) {
        return res.send({ error: "Something went wrong" });
      } else {
        console.log("GET SESSION GET");
        let dataObj = JSON.parse(data[0].value);
        //this comes out fine
        // console.log("GET SESSION", dataObj);
        return res.send({ user: dataObj });
      }
    });
    // res.send({ email: req.session.userEmail });
  } else {
    console.log("NOOOOOOOO");
    return res.send({ email: null });
  }
};
const check_login = function(req, res) {
  let email = req.body.user.email;
  let password = req.body.user.password;
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
      //   req.session.fname = "placeholder lol";
      //   req.session.userEmail = email;
      //   req.session.fname = "placeholder lol";
      console.log("user");
      console.log(req.session);
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
  //do something is weird with the password hash
  let hashed = SHA3(password).toString();
  let email = String(user.email);

  let birthday = user.birthday;
  let affil = user.affiliation;
  let userID = email.split("@")[0] + email.split("@")[1];
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
        interests: user.interests,
        email: email
      });
      users.put(userID, newUser, function(err2, data2) {
        //if error adding user
        if (err2) {
          //handle error putting shit in
          return res.send({ error: err2 });
        } else {
          //successfully put shit in, update the session
          req.session.userEmail = user.email;
          req.session.fname = fname;
          req.session.save();
          return res.send({ error: null });
        }
      });
    }
  });
  //create the new user here.
};

const store_session = function(req, res) {
  //stores the session
};
const userdb = {
  checkLogin: check_login,
  signup: signup,
  getSession: get_session
};
module.exports = userdb;
