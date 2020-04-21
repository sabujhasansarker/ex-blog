const router = require("express").Router();

const {
  exploreGetController,
  singlePostGetController,
} = require("../controller/exploreController");

router.get("/", exploreGetController);
router.get("/:postId", singlePostGetController);

module.exports = router;
