const express = require("express");
const path = require("path");
const routes = require("./routes/routes");
const app = express();

app.use(express.bodyParser());
app.use(express.logger("default"));

app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true }));

function hashPassword(password) {
  let hash = crypto.createHash("sha256");
  hash.update(password);
  return hash.digest("hex");
}

app.use(routes);
app.get("/", function(req, res) {
  res.send("hellp");
});
const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
