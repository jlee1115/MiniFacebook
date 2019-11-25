const express = require("express");
const path = require("path");
let app = express();

app.get("/", function(req, res) {
  res.send("hellp");
});
const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
