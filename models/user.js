const keyvaluestore = require("./keyvaluestore");
const users = new keyvaluestore("users");
users.init(function(err, data) {});

const check_login = function(userID, password, route_callback) {
  //do something here
};
const userdb = {
  checkLogin: check_login
};
module.exports = userdb;
