const keyvaluestore = require("./keyvaluestore");
const userPics = new keyvaluestore("userPics");
userPics.init(function(err, data) {});
const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");
const s3 = aws.config.loadFromPath("./config.json");

const uploadHelper = multer({
  storage: multerS3({
    s3: s3,
    bucket: "some-bucket",
    acl: "public-read",
    key: function(req, file, cb) {
      cb(null, req.session.userID);
    }
  })
});
const upload = function(req, res) {
  uploadHelper();
};
const uploadProfPic = function(req, res) {
  let formData = req.body;
  console.log("FILE", req.file);
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
  uploadProfPic,
  upload
};
module.exports = userPicsdb;
