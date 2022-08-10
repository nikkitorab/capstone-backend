const { Router } = require("express");
const controller = require("./controller");

const router = Router();

// router.get("/", controller.getSymptoms);
router.get("/", controller.getEntriesData);

module.exports = router;
