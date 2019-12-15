const keyvaluestore = require("./keyvaluestore");
const postLikes = new keyvaluestore("postLikes");
postLikes.init(function(err, data) {});

const getLikes = function(req, res) {
  //   let user = req.query.user;
  let postID = req.query.postID;
  postLikes.get(postID, function(err, data) {
    if (err) {
      return res.send({ err: err.message });
    } else if (!data) {
      return res.send({ likes: [] });
    } else {
      //   console.log(data);
      let likes = [];
      for (const like of data) {
        let val = JSON.parse(like.value);
        likes.push(val);
      }
      return res.send({ err: null, likes: likes });
    }
  });
};
const addLike = function(req, res) {
  let user = req.body.user;
  let postID = req.body.postID;
  postLikes.put(postID, JSON.stringify(user), function(err, data) {
    if (err) {
      //cannot like?
      return res.send({ err: err.message });
    } else {
      return res.send({ err: null });
    }
  });
};
const checkLike = function(req, res) {
  let user = JSON.parse(req.query.user);
  //   console.log("USERRRR", user);
  let postID = req.query.postID;
  //   console.log("USER", user);
  postLikes.get(postID, function(err, data) {
    if (err) {
      //
    } else if (!data) {
      return res.send({ liked: false });
    } else {
      for (const like of data) {
        let val = JSON.parse(like.value);
        if (val.email === user.email) {
          return res.send({ liked: true });
        }
      }
      return res.send({ liked: false });
    }
  });
};
const unlike = function(req, res) {
  let postID = req.body.postID;
  let user = req.body.user;
  let inx = -1;
  postLikes.get(postID, function(err, data) {
    if (err) {
      return res.send({ err: err.message });
    } else if (!data) {
      return res.send({ err: "Cannot unlike because you never liked" });
    } else {
      for (const item of data) {
        let currInx = item.inx;
        let currVal = JSON.parse(item.value);
        if (currVal.email === user.email) {
          inx = currInx;
        }
      }
      if (inx === -1) {
        res.send({ err: "Cannot unlike" });
      } else {
        postLikes.remove(postID, inx, function(err2, data2) {
          if (err2) {
            return res.send({ err: err2.message });
          } else {
            return res.send({ err: null });
          }
        });
      }
    }
  });
};
const postLikedb = {
  addLike,
  getLikes,
  checkLike,
  unlike
};
module.exports = postLikedb;
