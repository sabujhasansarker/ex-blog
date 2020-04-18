const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");

const User = require("../models/User");
const errorFormetter = require("../utils/validationErrorFormatter");
const Flash = require("../utils/Flash");

// * Sing up get controller

exports.signupGetController = (req, res, next) => {
  res.render("pages/auth/signup", {
    title: "Create a new account",
    error: {},
    values: {},
    flashMessage: Flash.getMessage(req),
  });
};

// * sing up post controller

exports.signupPostController = async (req, res, next) => {
  const { username, email, password } = req.body;

  let error = validationResult(req).formatWith(errorFormetter);
  console.log(error);
  if (!error.isEmpty()) {
    req.flash("fail", "Please Check your form");
    return res.render("pages/auth/signup", {
      title: "Create a new account",
      error: error.mapped(),
      values: { username, email, password },
      flashMessage: Flash.getMessage(req),
    });
  }

  try {
    const hashPassword = await bcrypt.hash(password, 10);

    const user = new User({
      username,
      email,
      password: hashPassword,
    });

    await user.save();
    req.flash("success", "User Created Successfully");
    return res.redirect("/auth/login");
  } catch (error) {
    next();
  }
};

// * login get controller

exports.loginGetController = (req, res, next) => {
  res.render("pages/auth/login", {
    title: "Login Your account",
    error: {},
    flashMessage: Flash.getMessage(req),
  });
};

// * log in post controller

exports.loginPostController = async (req, res, next) => {
  const { email, password } = req.body;
  let error = validationResult(req).formatWith(errorFormetter);

  if (!error.isEmpty()) {
    req.flash("fail", "Please Check your form");
    return res.render("pages/auth/login", {
      title: "Login Your account",
      error: error.mapped(),
      flashMessage: Flash.getMessage(req),
    });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      req.flash("fail", "Please Provide Valid Credentials");
      return res.render("pages/auth/login", {
        title: "Login Your account",
        error: {},
        flashMessage: Flash.getMessage(req),
      });
    }

    const matchPassword = await bcrypt.compare(password, user.password);
    if (!matchPassword) {
      req.flash("fail", "Please Provide Valid Credentials");
      return res.render("pages/auth/login", {
        title: "Login Your account",
        error: {},
        flashMessage: Flash.getMessage(req),
      });
    }

    req.session.isLoggedIn = true;
    req.session.user = user;
    req.session.save((err) => {
      if (err) {
        return next(err);
      }
      req.flash("success", "Successfully Logged In");
      res.redirect("/deshboard");
    });
  } catch (error) {
    next();
  }
};

// * Log out controller

exports.logoutController = (req, res, next) => {
  req.session.destroy((err) => {
    if (err) {
      return next();
    }
    return res.redirect("/auth/login");
  });
};
