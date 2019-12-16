const keyvaluestore = require("./keyvaluestore");
const friendReqs = new keyvaluestore("friendReqs");
const friends = new keyvaluestore("friends");
const users = new keyvaluestore("users");
users.init(function(err, data) {});
friendReqs.init(function(err, data) {});
friends.init(function(err, data) {});

const sendReq = function(req, res) {
  let userID = req.session.userID;
  if (!userID) {
    return res.send({ redirect: true });
  }

  let userTo = req.body.userTo.email.replace("@", "");
  console.log(userTo);
  friendReqs.put(userTo, userID, function(err, data) {
    if (err) {
      return res.send({ error: err.message });
    } else {
      return res.send({ error: null });
    }
  });
};
const getReqs = function(req, res) {
  let userID = req.session.userID;
  if (!userID) {
    return res.send({ redirect: true });
  }
  friendReqs.get(userID, function(err, data) {
    if (err) {
      return res.send({ error: err.message });
    } else if (!data) {
      return res.send({ requests: [] });
    } else {
      let items = [];
      for (let i = 0; i < data.length; i++) {
        // items.push(JSON.parse(data[i].value));
        items.push(data[i].value);
      }
      return res.send({ requests: items });
    }
  });
};
const respondToReq = function(req, res) {
  let accept = req.body.whetherAccept;
  let userFrom = req.body.userFrom;
  let inx = -1;
  friendReqs.get(req.session.userID, function(err, data) {
    if (err) {
      return res.send({ error: err.message });
    } else if (!data) {
      //
    } else {
      for (let i = 0; i < data.length; i++) {
        //if the right requests, then remove it
        if (data[i].value === userFrom) {
          inx = data[i].inx;
        }
      }
      if (inx !== -1) {
        friendReqs.remove(req.session.userID, inx, function(err2, data2) {
          if (err2) {
            return res.send({ error: err2.message });
          } else {
            //if it is accepted
            if (accept) {
              friends.put(userFrom, req.session.userID, function(e, d) {
                if (e) {
                  return res.send({ error: e.message });
                }
                //do something
                friends.put(req.session.userID, userFrom, function(e2, d2) {
                  //something
                  if (e2) {
                    return res.send({ error: e2.message });
                  }
                  return res.send({ error: null });
                });
              });
            }
          }
        });
        if (accept) {
          //add it to friends
        }
      }
    }
  });
};
const getFriends = function(req, res) {
  let userID = req.session.userID;
  if (!userID) {
    return res.send({ redirect: true });
  }
  friends.get(userID, function(err, data) {
    if (err) {
      return res.send({ error: err.message });
    } else if (!data) {
      return res.send({ friends: [] });
    } else {
      let items = [];
      for (let i = 0; i < data.length; i++) {
        items.push(JSON.parse(data[i].value));
      }
      return res.send({ friends: items });
    }
  });
};
const isFriend = function(req, res) {
  let userID = req.session.userID;
  let otherUser = req.query.user;
  friends.get(userID, function(err, data) {
    if (err) {
      return res.send({ error: err.message });
    } else if (!data) {
      return res.send({ isFriends: false });
    } else {
      for (let i = 0; i < data.length; i++) {
        if (data[i].value === otherUser) {
          return res.send({ isFriends: true });
        }
      }
      return res.send({ isFriends: false });
    }
  });
};

const friendsdb = {
  sendReq,
  getReqs,
  getFriends,
  respondToReq,
  isFriend
};
module.exports = friendsdb;
