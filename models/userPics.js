const keyvaluestore = require("./keyvaluestore");
const userPics = new keyvaluestore("userPics");
userPics.init(function(err, data) {});
// const upload = multer({
//   storage: storage,
//   limits: { fileSize: 1000000 }
// }).single("myImage");
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
// const uploadProfPic = upload(req, res, (err) => {
//   console.log(req.file)
//   console.log(req,body)
// })

const userPicsdb = {
  uploadProfPic
};
module.exports = userPicsdb;
