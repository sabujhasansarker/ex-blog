const { body } = require("express-validator");
const cheerio = require("cheerio");

module.exports = [
  body("title")
    .not()
    .isEmpty()
    .withMessage("Title can not Be Empty")
    .isLength({ max: 100 })
    .withMessage("Title Can Not Be Greater Then 100 Chars")
    .trim(),

  body("body")
    .not()
    .isEmpty()
    .withMessage("Body Can Not Be Empty")
    .custom((value) => {
      let node = cheerio.load(value);
      let text = node.text();

      if (text.length > 5000) {
        throw new Error("Body Can Not Be Greater Then 5000 Chars");
      }
      return true;
    }),
];
