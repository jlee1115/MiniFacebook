const fs = require("fs");
const getData = function(req, res) {
  //   let user = req.params.user;
  let user = "chaoupenn";
  fs.readFile("inputFile.txt", "utf-8", (err, data) => {
    if (err) throw err;
    let results = [];
    let dataSplit = data.split("\n");
    for (let i = 0; i < dataSplit.length; i++) {
      let line = dataSplit[i].split(" ");

      if (line[0] === user) {
        for (let j = 1; j < line.length; j++) {
          results.push(line[j].trim().replace("\r", ""));
        }
      }
    }
    console.log(results);
    // return res.send({ users: data });
  });
};
getData();
const getRecs = {
  getData
};
module.exports = getRecs;
