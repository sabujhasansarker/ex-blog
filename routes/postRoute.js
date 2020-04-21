const router = require("express").Router();

const {
  createPostPostController,
  createPostGetController,
  editPostGetController,
  editGetPostController,
  getDeletePostGetController,
  getAllPosts,
} = require("../controller/postController");

const { isAuthenticated } = require("../middleware/authMiddleware");

const postValidation = require("../validator/dashboard/post/postValidation");
const upload = require("../middleware/uploadMiddeware");

router.get("/create", isAuthenticated, createPostGetController);
router.get("/edit/:postId", isAuthenticated, editPostGetController);
router.get("/delete/:postId", isAuthenticated, getDeletePostGetController);
router.post(
  "/create",
  isAuthenticated,
  upload.single("post-thumbnail"),
  postValidation,
  createPostPostController
);
router.post(
  "/edit/:postId",
  isAuthenticated,
  upload.single("post-thumbnail"),
  postValidation,
  editGetPostController
);

router.get("/", isAuthenticated, getAllPosts);
module.exports = router;
