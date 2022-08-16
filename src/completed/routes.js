const { Router } = require("express");
const controller = require("./controller");
const router = Router();

router.get("/symptoms", controller.getCompletedSymptomEntries);

router.get("/triggers", controller.getCompletedTriggerEntries);

module.exports = router;
