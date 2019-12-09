const keyvaluestore = require("./keyvaluestore");
const postComments = new keyvaluestore("postComments");
postComments.init(function(err, data) {});

const getComments = function(req, res) {
  //get the comments by the id
  let id = req.query.postID;
  //   console.log("IDDDDD", id);
  postComments.get(id, function(err, data) {
    if (err) {
      return res.send({ error: err.message });
    } else {
      if (!data) {
        return res.send({ comments: [] });
      }
      let items = [];
      for (const item of data) {
        let val = JSON.parse(item.value);
        items.push(val);
      }
      items.sort(function(a, b) {
        return new Date(b.date) - new Date(a.date);
      });
      return res.send({ comments: items });
    }
  });

  //   postComments.get(id, function(err, data) {
  //     //
  //   });

  //   console.log(id);
};
//takes in a user and a post id
const addComment = function(req, res) {
  //do something
  //   console.log(req.body);
  let postID = req.body.postID;
  let user = req.body.userLoggedIn;
  let content = req.body.content;
  let commentID = req.body.id;
  let date = req.body.date;
  let comment = JSON.stringify({
    postID,
    user,
    content,
    commentID,
    date
  });
  postComments.put(postID, comment, function(err, data) {
    if (err) {
      console.log(err);
      return res.send({ error: err.message });
    } else {
      console.log(data);
      return res.send({ error: null });
    }
  });
};

const postCommentsdb = {
  getPostComments: getComments,
  addCommentToPost: addComment
};
module.exports = postCommentsdb;
