const router = require("express").Router();

const signupValidator = require("../validator/auth/sigupValidator");
const loginValidator = require("../validator/auth/loginValidator");

const {
  signupGetController,
  signupPostController,
  loginGetController,
  loginPostController,
  logoutController,
} = require("../controller/authController");

router.get("/signup", signupGetController);
router.post("/signup", signupValidator, signupPostController);
router.get("/login", loginGetController);
router.post("/login", loginValidator, loginPostController);
router.get("/logout", logoutController);
module.exports = router;
