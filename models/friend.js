const keyvaluestore = require("./keyvaluestore");
const friendReqs = new keyvaluestore("friendReqs");
const friends = new keyvaluestore("friends");
const users = new keyvaluestore("users");
users.init(function(err, data) {});
friendReqs.init(function(err, data) {});
friends.init(function(err, data) {});

//sends a request to a user
const sendReq = function(req, res) {
  let userID = req.session.userID;
  if (!userID) {
    return res.send({ redirect: true });
  }

  let userTo = req.body.userTo.email.replace("@", "");
  friendReqs.put(userTo, userID, function(err, data) {
    if (err) {
      return res.send({ error: err.message });
    } else {
      return res.send({ error: null });
    }
  });
};

//gets all the requests to a user
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
//removed a friend
const removeFriend = function(req, res) {
  //remove friend
  let userTo = req.body.userTo;
  let userID = req.session.userID;
  let inx1 = -1;
  let inx2 = -1;
  friends.get(userTo, function(err, data) {
    if (!err && data) {
      for (const item of data) {
        if (item.value === userID) {
          inx1 = item.inx;
        }
      }
      if (inx1 !== -1) {
        //removes it
        friends.remove(userTo, inx1, function(errRem, dataRem) {
          if (!errRem) {
            //gets the second inx
            friends.get(userID, function(err2, data2) {
              if (!err2 && data2) {
                for (const item2 of data2) {
                  if (item2.value === userTo) {
                    inx2 = item2.inx;
                  }
                }
                if (inx2 !== -1) {
                  friends.remove(userID, inx2, function(errRem2, dataRem) {
                    if (!errRem2) {
                      return res.send({ success: true });
                    }
                  });
                }
              }
            });
          }
        });
      }
    }
  });
};

//allows a user to respond to a request
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
                  req.session.friends[userFrom] = true;
                  return res.send({ error: null });
                });
              });
            }
          }
        });
      }
    }
  });
};

//gets all of a user's friends
const getFriends = function(req, res) {
  let userID = req.session.userID;
  if (!userID) {
    return res.send({ redirect: true });
  }
  friends.get(userID, function(err, data) {
    if (err) {
      return res.send({ error: err.message });
    } else if (!data) {
      return res.send({ users: [] });
    } else {
      let items = [];
      for (let i = 0; i < data.length; i++) {
        items.push(data[i].value);
      }
      return res.send({ users: items });
    }
  });
};

// Checks if a user with the specified ID is friends with the user logged in
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
//checks if a user has sent a friend request to / from the user logged in
const hasSentFriendReq = function(req, res) {
  let userID = req.session.userID;
  let otherUser = req.query.user;
  friendReqs.get(userID, function(err, data) {
    if (err) {
      return res.send({ error: err.message });
    } else if (data) {
      for (let i = 0; i < data.length; i++) {
        if (data[i].value === otherUser) {
          return res.send({ reqSentTo: true });
        }
      }
    } else {
      friendReqs.get(otherUser, function(err2, data2) {
        if (err2) {
          return res.send({ error: err.message });
        } else if (data2) {
          for (let i = 0; i < data2.length; i++) {
            if (data2[i].value === userID) {
              //I sent req to other user
              return res.send({ reqSentFrom: true });
            }
          }
        } else {
          return res.send({ error: null });
        }
      });
    }
  });
};

// Gets all possible recommendations to send requests
const fs = require("fs");
const getFriendRequests = function(req, res) {
  let user = req.session.userID;
  //   let user = req.params.user;
  // let user = "chaoupenn";
  fs.readFile("inputFile.txt", "utf-8", (err, data) => {
    if (err) throw err;
    let results = [];
    let dataSplit = data.split("\n");
    for (let i = 0; i < dataSplit.length; i++) {
      let line = dataSplit[i].split(" ");

      if (line[0] === user) {
        for (let j = 1; j < line.length; j++) {
          results.push(line[j].trim().replace("\r", ""));
        }
      }
    }
    return res.send({ recs: results });
    console.log(results);
    // return res.send({ users: data });
  });
};

const friendsdb = {
  sendReq,
  getReqs,
  getFriends,
  respondToReq,
  isFriend,
  hasSentFriendReq,
  removeFriend,
  getFriendRequests
};
module.exports = friendsdb;
