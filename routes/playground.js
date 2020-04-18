const router = require("express").Router();
const uploade = require("../middleware/uploadMiddeware");

router.get("/", (req, res, next) => {
  res.render("playground/signup", { title: "Playground", flashMessage: {} });
});

router.post("/", uploade.single("ex-blog-pic"), (req, res, next) => {
  console.log(req.file);
  res.render("playground/signup", { title: "Playground", flashMessage: {} });
});

module.exports = router;
