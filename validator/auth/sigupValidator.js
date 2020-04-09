const { body } = require("express-validator");

const User = require("../../models/User");

module.exports = signupValidator = [
  body("username")
    .isLength({ min: 2, max: 15 })
    .withMessage("Username must be between 2 to 15 chars")
    .custom(async (username) => {
      let user = await User.findOne({ username });
      if (user) {
        return Promise.reject("Username already used");
      }
    })
    .trim(),

  body("email")
    .isEmail()
    .withMessage("Please Provide a valid Email")
    .custom(async (email) => {
      let user = await User.findOne({ email });
      if (user) {
        return Promise.reject("Email already used");
      }
    })
    .normalizeEmail(),

  body("password")
    .isLength({ min: 5 })
    .withMessage("Your password must be greater then 5 chars"),

  body("confirmPassword")
    .isLength({ min: 5 })
    .withMessage("Your password must be greater then 5 chars")
    .custom((confirmPassword, { req }) => {
      if (confirmPassword !== req.body.password) {
        throw new Error("Password dose not match");
      }
      return true;
    }),
];
