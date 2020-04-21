const router = require("express").Router();

const { exploreGetController } = require("../controller/exploreController");

router.get("/", exploreGetController);

module.exports = router;
