const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
require("dotenv/config");

const { bindUserWithReqest } = require("./middleware/authMiddleware");
const setLoals = require("./middleware/setLocals");

const app = express();

// * mongoDb session
var store = new MongoDBStore({
  uri: process.env.DATABASE,
  collection: "sessions",
  expires: 1000 * 60 * 60 * 2,
});

// * ejs setup
app.set("view engine", "ejs");
app.set("views", "views");

// * Middleware Setup
const middleware = [
  morgan("dev"),
  express.static("public"),
  express.urlencoded({ extended: true }),
  express.json(),
  session({
    secret: process.env.SECRET_KEY || "SECRET_KEY",
    resave: false,
    saveUninitialized: false,
    store: store,
  }),
  bindUserWithReqest(),
  setLoals(),
];
app.use(middleware);

// * Router Setap
const authRoute = require("./routes/authRoute");
app.use("/auth", authRoute);

const deshboard = require("./routes/deshBoardRoute");
app.use("/", deshboard);

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log("DataBase Connected");
      console.log(`Server is running on Port ${PORT}`);
    });
  })
  .catch((e) => {
    return console.log(e);
  });
