const express = require("express");
const flash = require("connect-flash");
const morgan = require("morgan");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);

const { bindUserWithReqest } = require("./authMiddleware");
const setLoals = require("./setLocals");

var store = new MongoDBStore({
  uri: process.env.DATABASE,
  collection: "sessions",
  expires: 1000 * 60 * 60 * 2,
});

const middleware = [
  morgan("dev"),
  express.static("public"),
  express.urlencoded({ extended: true }),
  express.json(),
  session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    store: store,
  }),
  flash(),
  bindUserWithReqest(),
  setLoals(),
];

module.exports = (app) => {
  middleware.forEach((m) => {
    app.use(m);
  });
};
