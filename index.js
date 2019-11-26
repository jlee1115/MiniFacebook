const express = require("express");
const path = require("path");
const routes = require("./routes/routes");
const app = express();

app.use(express.bodyParser());
app.use(express.logger("default"));

function hashPassword(password) {
  let hash = crypto.createHash("sha256");
  hash.update(password);
  return hash.digest("hex");
}

app.get("/", function(req, res) {
  res.send("hellp");
});
const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
