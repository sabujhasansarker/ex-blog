const { body } = require("express-validator");
const validator = require("validator");

const coustomValidator = (value) => {
  if (value) {
    if (!validator.isURL(value)) {
      throw new Error("Pleace enter a valid url");
    }
  }
  return true;
};

module.exports = [
  body("name")
    .not()
    .isEmpty()
    .withMessage("Name can not be empty")
    .isLength({ max: 50 })
    .withMessage("Name can not be more than 50 chars"),

  body("title")
    .not()
    .isEmpty()
    .withMessage("Title can not bt empty")
    .isLength({ max: 100 })
    .withMessage("Title can not be more than 100 chares"),

  body("bio")
    .not()
    .isEmpty()
    .withMessage("bio can not bt empty")
    .isLength({ max: 100 })
    .withMessage("bio can not be more than 100 chares"),

  body("website").custom(coustomValidator),
  body("facebook").custom(coustomValidator),
  body("twitter").custom(coustomValidator),
  body("github").custom(coustomValidator),
];
