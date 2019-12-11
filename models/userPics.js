const keyvaluestore = require("./keyvaluestore");
const userPics = new keyvaluestore("userPics");
userPics.init(function(err, data) {});
const uploadProfPic = function(req, res) {
  let formData = req.body;

  console.log("PROFILE", req.body);
  userPics.put("test", JSON.stringify(formData), function(err, data) {
    if (err) {
      console.log(err);
    } else {
      console.log(data);
    }
  });
};

const userPicsdb = {
  uploadProfPic
};
module.exports = userPicsdb;
