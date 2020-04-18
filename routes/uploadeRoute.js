const router = require("express").Router();

const { isAuthenticated } = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddeware");
const {
  uploadProfilePics,
  removeProfilePics,
  postImageUploadCondtroller,
} = require("../controller/upLoadController");

router.post("/profilePics", upload.single("profilePics"), uploadProfilePics);

router.delete("/profilePics", isAuthenticated, removeProfilePics);

router.post(
  "/postimage",
  upload.single("post-image"),
  postImageUploadCondtroller
);

module.exports = router;
