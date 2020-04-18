const router = require("express").Router();

const { isAuthenticated } = require("../middleware/authMiddleware");
const profileValidator = require("../validator/dashboard/profileValidator");

const {
  deshBoardGetController,
  createProfilePostController,
  createProfileGetController,
  editProfileGetController,
  editProfilePostController,
} = require("../controller/deshBoardController");

router.get("/create-profile", isAuthenticated, createProfileGetController);
router.post(
  "/create-profile",
  isAuthenticated,
  profileValidator,
  createProfilePostController
);

router.get("/edit-profile", isAuthenticated, editProfileGetController);
router.post("/edit-profile", isAuthenticated, editProfilePostController);

router.get("/", isAuthenticated, deshBoardGetController);

module.exports = router;
