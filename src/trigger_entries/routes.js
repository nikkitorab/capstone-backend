const { Router } = require("express");
const controller = require("./controller");
const router = Router();

router.get("/", controller.getTriggerEntries);

router.get("/:id", controller.getTriggerEntryById);

//post request (use for when they START a daily entry, like pressing start button send s request)
router.post("/", controller.addTriggerEntry);

module.exports = router;
