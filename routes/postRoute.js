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
const uploade = require("../middleware/uploadMiddeware");

router.get("/create", isAuthenticated, createPostGetController);
router.get("/edit/:postId", isAuthenticated, editPostGetController);
router.get("/delete/:postId", isAuthenticated, getDeletePostGetController);
router.post(
  "/create",
  isAuthenticated,
  uploade.single("thumbnail"),
  postValidation,
  createPostPostController
);
router.post(
  "/edit/:postId",
  isAuthenticated,
  uploade.single("thumbnail"),
  postValidation,
  editGetPostController
);

router.get("/", isAuthenticated, getAllPosts);
module.exports = router;
