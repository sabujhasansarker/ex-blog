const router = require("express").Router();

const { isAuthenticated } = require("../middleware/authMiddleware");

const { deshBoardGetController } = require("../controller/deshBoardController");

router.get("/", isAuthenticated, deshBoardGetController);

module.exports = router;
