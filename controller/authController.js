const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");

const User = require("../models/User");
const errorFormetter = require("../utils/validationErrorFormatter");

exports.signupGetController = (req, res, next) => {
  res.render("pages/auth/signup", {
    title: "Create a new account",
    error: {},
    values: {},
  });
};
exports.signupPostController = async (req, res, next) => {
  const { username, email, password } = req.body;

  let error = validationResult(req).formatWith(errorFormetter);
  if (!error.isEmpty()) {
    console.log(error.mapped());
    return res.render("pages/auth/signup", {
      title: "Create a new account",
      error: error.mapped(),
      values: { username, email, password },
    });
  }

  try {
    const hashPassword = await bcrypt.hash(password, 10);

    const user = new User({
      username,
      email,
      password: hashPassword,
    });

    const newUser = await user.save();
    res.render("pages/auth/signup", { title: "Create a new account" });
    console.log(newUser);
  } catch (error) {
    console.log(error);
    next();
  }
};
exports.loginGetController = (req, res, next) => {
  res.render("pages/auth/login", { title: "Login Your account", error: {} });
};
exports.loginPostController = async (req, res, next) => {
  const { email, password } = req.body;
  let error = validationResult(req).formatWith(errorFormetter);
  if (!error.isEmpty()) {
    return res.render("pages/auth/login", {
      title: "Login Your account",
      error: error.mapped(),
    });
  }
  try {
    const user = await User.findOne({ email });
    if (!user) {
      res.json({ message: "Invalid Credential" });
    }
    const matchPassword = await bcrypt.compare(password, user.password);
    if (!matchPassword) {
      res.json({ message: "Invalid Credential" });
    }
    console.log("Successfully Logged in ", user);
    res.render("pages/auth/login", { title: "Login Your account" });
  } catch (error) {
    console.log(error);
    next();
  }
};
exports.logoutController = (req, res, next) => {};
