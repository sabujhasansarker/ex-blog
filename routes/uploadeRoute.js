const router = require("express").Router();

const { isAuthenticated } = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddeware");
const {
  uploadProfilePics,
  removeProfilePics,
  postImageUploadController,
} = require("../controller/upLoadController");

router.post("/profilePics", upload.single("profilePics"), uploadProfilePics);

router.delete("/profilePics", isAuthenticated, removeProfilePics);

router.post(
  "/postimage",
  isAuthenticated,
  upload.single("post-image"),
  postImageUploadController
);

module.exports = router;
