const keyvaluestore = require("./keyvaluestore");
const posts = new keyvaluestore("posts");
users.init(function(err, data) {});

const addPost = function(req, res) {
  let post = req.body.post;
  let toUser = post.to;
  //do something
};
const getPosts = function(req, res) {
  posts.scanKeys(function(err, data) {
    if (err) {
      res.send({ err: err.message });
    } else {
      let items = [];
      for (const itemList of data) {
        for (let i = 0; i < itemList.length; i++) {
          let item = itemList[i];
          let val = JSON.parse(item.value);
          let key = item.key;
          //   let obj = Object.assign({})
        }
      }
    }
  });
};

const postdb = {
  //stuff here
  addPost: addPost,
  getPosts: getPosts
};
module.exports = postdb;
