const router = require("express").Router();

const {
  createPostPostController,
  createPostGetController,
} = require("../controller/postController");

const { isAuthenticated } = require("../middleware/authMiddleware");

const postValidation = require("../validator/dashboard/post/postValidation");
const uploade = require("../middleware/uploadMiddeware");

router.get("/create", isAuthenticated, createPostGetController);
router.post(
  "/create",
  isAuthenticated,
  uploade.single("thumbnail"),
  postValidation,
  createPostPostController
);

module.exports = router;
