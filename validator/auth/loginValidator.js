const { body } = require("express-validator");
const User = require("../../models/User");

module.exports = loginValidator = [
  body("email").not().notEmpty().withMessage("Please enter your email"),
  body("password").not().notEmpty().withMessage("Please enter your password"),
];
