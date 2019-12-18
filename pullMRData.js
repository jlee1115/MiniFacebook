const keyvaluestore = require("./models/keyvaluestore.js");
const users = new keyvaluestore("users");
const friends = new keyvaluestore("friends");
const fs = require("fs");
users.init(function(err, data) {});

let keys = [];
let promises = [];
let dataObj = {};
let output = "";
const getKeys = function() {
  users.scanKeys(async function(err, data) {
    if (err) {
      console.log("Error", err);
    } else if (!data) {
      console.log("No data in table");
    } else {
      // let output = "";
      for (let i = 0; i < data.length; i++) {
        let key = data[i].key;
        let arr = [];

        let val = JSON.parse(data[i].value);
        arr = [...val.interests, val.affiliation];
        dataObj[key] = arr;
        // console.log(dataObj[key]);
        keys.push(data[i].key);
        promises.push(getUsers(data[i].key));
      }
      await Promise.all(promises);
      console.log("done");
    }
  });
};
const getUsers = async function(key) {
  friends.get(key, async function(err2, data2) {
    if (err2) {
      console.log("error retrieving friends", err2);
    } else if (!data2) {
      console.log("no friend data");
    } else {
      for (let k = 0; k < data2.length; k++) {
        // console.log(dataObj[key]);
        dataObj[key] = [...dataObj[key], data2[k].value];
      }
    }
    let curr = "";
    curr += key + " ";
    curr += dataObj[key].join(" ");
    curr += "\n";

    await fs.writeFile("recsInput.txt", curr, err => {
      if (err) throw err;
      console.log(curr);
      console.log("Data successfully retrieved from database!");
    });
  });
};
friends.init(async function(errF, dataF) {
  await getKeys();
  console.log("hi");
});
