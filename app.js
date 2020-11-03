const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const authRouter = require("./routes/page");
const session = require("express-session");
const rateLimit = require("express-rate-limit");
var port = process.env.PORT || 5000;

const public = path.join(__dirname, "./views/");
app.use(express.static(public));

app.use(express.urlencoded({ extended: true }));
app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "*");

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

  // Pass to next layer of middleware
  next();
});
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
});
app.use(express.json());
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);

app.set("viw engine", "hbs");

//router
app.use("/", authRouter, apiLimiter);
app.use(apiLimiter);

app.listen(port, () => {
  console.log("Server Start");
});
