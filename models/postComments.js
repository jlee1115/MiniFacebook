const keyvaluestore = require("./keyvaluestore");
const postComments = new keyvaluestore("postComments");
postComments.init(function(err, data) {});

const getComments = function(req, res) {
  //get the comments by the id
  let id = req.params.id;
  console.log(id);
};

const postCommentsdb = {
  getPostComments: getComments
};
