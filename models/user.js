const keyvaluestore = require("./keyvaluestore");
const users = new keyvaluestore("users");
const SHA3 = require("crypto-js/sha3");
const session = require("express-session");
users.init(function(err, data) {});

const get_session = function(req, res) {
  //   console.log("in get");
  //   console.log(req.session.id);
  //   console.log(req.session);
  let userID = req.session.userID;

  //   let userID = "jleeupenn";
  if (userID) {
    users.get(userID, function(err, data) {
      if (err) {
        return res.send({ error: err.message });
      } else if (!data) {
        return res.send({ error: "Something went wrong" });
      } else {
        // console.log("GET SESSION GET");
        let dataObj = JSON.parse(data[0].value);
        //this comes out fine
        // console.log("GET SESSION", dataObj);
        return res.send({ user: dataObj, userID: userID });
      }
    });
    // res.send({ email: req.session.userEmail });
  } else {
    console.log("NOOOOOOOO");
    return res.send({ user: null });
  }
};
const get_user_page = function(req, res) {
  let userID = req.query.userID;
  users.get(userID, function(err, data) {
    if (err) {
      return res.send({ error: err.message });
    } else if (!data) {
      return res.send({ error: "User profile cannot be displayed" });
    } else {
      let dataObj = JSON.parse(data[0].value);
      return res.send({ user: dataObj });
    }
  });
};
const check_login = function(req, res) {
  let userID = req.body.user.userID;
  let password = req.body.user.password;
  users.get(userID, function(err, data) {
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
      if (hashed !== dataPW) {
        res.send({ error: "Wrong Password" });
        return;
      }
      //   console.log("ID", req.session.id);
      req.session.userID = userID;
      //   req.session.fname = "placeholder lol";
      //   req.session.userEmail = email;
      //   req.session.fname = "placeholder lol";
      //   console.log("user");
      //   console.log(req.session);
      //sends no error
      res.send({ error: null });
      return;
    }
  });
};
const signup = function(req, res) {
  let user = req.body.user;
  //   console.log(req.body.user);
  let fname = user.fname;
  let lname = user.lname;
  let password = user.password;
  //do something is weird with the password hash
  let hashed = SHA3(password).toString();
  let email = String(user.email);

  let birthday = user.birthday;
  let affil = user.affiliation;
  let userID = email.replace("@", "");
  //   console.log("email", String(user.email));

  users.exists(userID, function(err, data) {
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
          req.session.userID = userID;
          return res.send({ error: null });
        }
      });
    }
  });
  //create the new user here.
};

const uploadProfPic = function(req, res) {};
const userdb = {
  checkLogin: check_login,
  signup: signup,
  getSession: get_session,
  getUserPage: get_user_page,
  uploadProfPic: uploadProfPic
};
module.exports = userdb;
