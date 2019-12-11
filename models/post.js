const keyvaluestore = require("./keyvaluestore");
const posts = new keyvaluestore("posts");
posts.init(function(err, data) {});

const addPost = function(req, res) {
  let post = req.body.post;
  let date = post.date;
  let fromUser = post.fromUser;
  let toUser = post.toUser;
  let content = post.content;
  let id = post.id;
  let newPost = JSON.stringify({
    content,
    date,
    fromUser,
    toUser,
    id
  });
  //do something
  posts.put(toUser.email.replace("@", ""), newPost, function(err, data) {
    if (err) {
      //respond to error
      return res.send({ error: err.message });
    } else {
      return res.send({ error: null });
    }
  });
};
const getPosts = function(req, res) {
  posts.scanKeys(function(err, data) {
    if (err) {
      return res.send({ err: err.message });
    } else {
      let items = [];
      for (let i = 0; i < data.length; i++) {
        items.push(JSON.parse(data[i].value));
      }

      items.sort(function(a, b) {
        return new Date(b.date) - new Date(a.date);
      });
      return res.send({ err: null, items: items });
      //   return res.send({ err: null, items: items.slice(start, end), hasMore: hasMore });
    }
  });
};
const getUserPosts = function(req, res) {
  let user = req.query.user;
  let page = req.query.page;
  posts.get(user, function(err, data) {
    //do something.
    if (err) {
      return res.send({ err: err.message });
    } else if (!data) {
      return res.send({ posts: [] });
    } else {
      //   console.log("DATA", data.length);
      let dataResult = [];
      for (let i = 0; i < data.length; i++) {
        dataResult.push(JSON.parse(data[i].value));
      }
      //   dataObjs = data.map(item => JSON.parse(item));
      dataResult.sort(function(a, b) {
        return new Date(b.date) - new Date(a.date);
      });
      return res.send({ posts: dataResult });
    }
  });
};

const postdb = {
  addPost: addPost,
  getPosts: getPosts,
  getUserPosts: getUserPosts
};
module.exports = postdb;
