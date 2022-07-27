const { Router } = require("express");
const controller = require("./controller");
const router = Router();

router.get("/", controller.getTriggers);

router.get("/:id", controller.getTriggerById);

//post request (use for when they START a daily entry, like pressing start button send s request)
router.post("/", controller.addTrigger);

module.exports = router;
