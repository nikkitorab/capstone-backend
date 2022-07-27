//trigger_entries routes

const { Router } = require("express");
//import controller
const controller = require("./controller");
const router = Router();

router.get("/", controller.getTriggerEntries);

//get trigger_entry by id
router.get("/:id", controller.getTriggerEntryById);

//post request (use for when they START a daily entry, like pressing start button send s request)
router.post("/", controller.addTriggerEntry);

module.exports = router;
