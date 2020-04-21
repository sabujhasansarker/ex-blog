const router = require("express").Router();

const { isAuthenticated } = require("../middleware/authMiddleware");
const {
  commentPostController,
  replyCommentPostController,
} = require("../controller/commentController");

const {
  likesGetController,
  getDislikeController,
} = require("../controller/likeDislikeController");

const { bookmarkGetController } = require("../controller/bookMarkController");

router.post("/comments/:postId", isAuthenticated, commentPostController);
router.post(
  "/comments/replies/:commentId",
  isAuthenticated,
  replyCommentPostController
);

router.get("/likes/:postId", isAuthenticated, likesGetController);
router.get("/dislikes/:postId", isAuthenticated, getDislikeController);

router.get("/bookmarks/:postId", isAuthenticated, bookmarkGetController);
module.exports = router;
