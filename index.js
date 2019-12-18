const express = require("express");
const http = require("http");
const path = require("path");
const routes = require("./routes/routes");
const session = require("express-session");
const app = express();
const logger = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");

const userdb = require("./models/user");
var proxy = require('http-proxy-middleware');


//app.use(logger("dev"));
// app.use(bodyParser.json());
app.use(bodyParser());
// app.use(express.logger("default"));
// app.use(cors());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true // enable set cookie
  })
);

app.use(
  '/api',
  proxy({ target: 'http://10.103.76.104:3000', changeOrigin: true })
);

// app.use((req, res, next) => {
//   res.set({
//     "Access-Control-Allow-Origin": "*",
//     "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
//     "Access-Control-Allow-Headers": "Content-Type"
//   });
//   next();
// });

app.use(
  session({
    secret: "keyboard cat",
    resave: true,
    saveUninitialized: false
    // cookie: { secure: false }
  })
);

app.use(routes);
const port = process.env.PORT || 8000;
const server = http.createServer(app);
const io = require("socket.io")(server);

module.exports = { io: io };

app.set('port', port);

server.listen(port, () => console.log(`Example app listening on port ${port}!`));

const handler = require('./socket');
io.on('connection', handler);