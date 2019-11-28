const express = require("express");
const path = require("path");
const routes = require("./routes/routes");
const session = require("express-session");
const app = express();
const logger = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(cors());
app.use((req, res, next) => {
  res.set({
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
    "Access-Control-Allow-Headers": "Content-Type"
  });
  next();
});

app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true }));

function hashPassword(password) {
  let hash = crypto.createHash("sha256");
  hash.update(password);
  return hash.digest("hex");
}

app.use(routes);
// app.post("/login", function(req, res) {
//   console.log("in post");
//   res.send("yay from routes");
// });
const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
