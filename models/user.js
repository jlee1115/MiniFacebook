const keyvaluestore = require("./keyvaluestore");
const users = new keyvaluestore("users");
const usersOnServer = new keyvaluestore("usersOnServer");
const SHA3 = require("crypto-js/sha3");
const session = require("express-session");
users.init(function(err, data) {});
usersOnServer.init(function(err, data) {});

const get_session = function(req, res) {
  //   console.log("in get");
  //   console.log(req.session.id);
  //   console.log(req.session);
  let userID = req.session.userID;
  if (userID) {
    users.get(userID, function(err, data) {
      if (err) {
        return res.send({ error: err.message });
      } else if (!data) {
        return res.send({ error: "Something went wrong" });
      } else {
        let dataObj = JSON.parse(data[0].value);
        //this comes out fine
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
  let userFetched = null;
  users.get(userID, function(err, data) {
    //user not found: err exists
    if (err) {
      console.log(err);
      return res.send({ error: err.message });
    } else if (!data) {
      return res.send({ error: "Something went wrong" });
    } else {
      let dataObj = data[0].value;
      userFetched = JSON.parse(dataObj);
      let dataPW = JSON.parse(dataObj).password;

      let hashed = SHA3(password).toString();
      if (hashed !== dataPW) {
        res.send({ error: "Wrong Password" });
        return;
      }
      if (!userFetched) {
        return res.send({ error: "No user found" });
      }
      //   console.log("ID", req.session.id);
      req.session.userID = userID;

      //add it to the server
      // putOnServer(req.session.userID.replace("@", ""), userFetched);
      usersOnServer.exists(req.session.userID.replace("@", ""), function(
        errExists,
        dataExists
      ) {
        console.log(dataExists);
        if (!errExists && !dataExists) {
          console.log("WHY DOES THISSSSS", dataExists);
          usersOnServer.put(
            req.session.userID.replace("@", ""),
            JSON.stringify(userFetched),
            function(err2, data2) {
              //do something
              if (err2) {
                return res.send({ error: "cannot add to server" });
                // console.log(err);
              } else {
                //this is just 1
                return res.send({ error: null });
                // console.log("DAAAAATAAAA", data);
              }
            }
          );
        } else {
          return res.send({ error: null });
        }
      });
    }
  });
};
// const putOnServer = async function(userID, user) {
//   await usersOnServer.put(userID, JSON.stringify(user), function(err, data) {
//     //do something
//     if (err) {
//       return res.send({ error: "cannot add to server" });
//     } else {
//       //this is just 1
//       return res.send({ error: null });
//     }
//   });
// };
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
          return res.send({ error: err2.message });
        } else {
          //successfully put shit in, update the session
          req.session.userID = userID;

          usersOnServer.put(userID, newUser, function(err3, data3) {
            //do something
            if (err3) {
              return res.send({ error: err3.message });
            } else {
              //this is just 1
              return res.send({ error: null });
            }
          });
          // return res.send({ error: null });
        }
      });
    }
  });
  //create the new user here.
};
const logout = function(req, res) {
  let inx = -1;
  usersOnServer.get(req.session.userID, function(err, data) {
    if (err) {
      return res.send({ error: err.message });
    } else if (!data) {
      return res.send({ error: "Something went wrong" });
    } else {
      inx = data[0].inx;
      // if (inx === -1) {
      //   return res.send({ error: "Cannot sign out" });
      // }
      usersOnServer.remove(req.session.userID, inx, function(err2, data2) {
        if (err2) {
          return res.send({ error: err.message });
        } else {
          req.session.userID = null;
          return res.send({ error: null });
        }
      });
    }
  });
};
const getAllUsersOnServer = function(req, res) {
  usersOnServer.scanKeys(function(err, data) {
    //do something
    if (err) {
      return res.send({ error: err.message });
    } else if (!data) {
      return res.send({ users: [] });
    } else {
      let items = [];
      for (let i = 0; i < data.length; i++) {
        items.push(JSON.parse(data[i].value));
      }
      return res.send({ users: items });
    }
  });
};
const manageSession = function(req, res, next) {
  if (!req.session.userID) {
    //clear session?
  }
  next();
};

const uploadProfPic = function(req, res) {};
const userdb = {
  checkLogin: check_login,
  signup: signup,
  getSession: get_session,
  getUserPage: get_user_page,
  uploadProfPic: uploadProfPic,
  logout,
  manageSession,
  getAllUsersOnServer
};
module.exports = userdb;
