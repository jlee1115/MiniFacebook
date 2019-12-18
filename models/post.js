const keyvaluestore = require("./keyvaluestore");
const posts = new keyvaluestore("posts");
posts.init(function(err, data) {});

//adds a post with time, user to/from, id, privacy, and content
const addPost = function(req, res) {
  let post = req.body.post;
  let date = post.date;
  let fromUser = post.fromUser;
  let toUser = post.toUser;
  let content = post.content;
  let id = post.id;
  let public = post.public;
  let newPost = JSON.stringify({
    content,
    date,
    fromUser,
    toUser,
    id,
    public
  });
  //puts it in the table
  posts.put(toUser.email.replace("@", ""), newPost, function(err, data) {
    if (err) {
      //respond to error
      return res.send({ error: err.message });
    } else {
      return res.send({ error: null });
    }
  });
};
//gets all the posts that are from friends or are public
const getPosts = function(req, res) {
  if (!req.session.userID) {
    return res.send({ redirect: true });
  }
  posts.scanKeys(function(err, data) {
    if (err) {
      return res.send({ err: err.message });
    } else {
      let items = [];
      for (let i = 0; i < data.length; i++) {
        let poster = data[i].key;
        let val = JSON.parse(data[i].value);
        //THIS GETS POSTS BY FRIENDS ONLY
        if (req.session.friends[poster] || poster === req.session.userID || val.public) {
          items.push(JSON.parse(data[i].value));
        }
      }

      items.sort(function(a, b) {
        return new Date(b.date) - new Date(a.date);
      });
      return res.send({ err: null, items: items });
    }
  });
};
//gets all the posts to a user
const getUserPosts = function(req, res) {
  let user = req.query.user;
  let page = req.query.page;
  posts.get(user, function(err, data) {
    if (err) {
      return res.send({ err: err.message });
    } else if (!data) {
      return res.send({ posts: [] });
    } else {
      let dataResult = [];
      for (let i = 0; i < data.length; i++) {
        dataResult.push(JSON.parse(data[i].value));
      }
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
