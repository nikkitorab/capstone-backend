const { Router } = require("express");
const controller = require("./controller");
const router = Router();

router.get("/", controller.getTriggers);

router.get("/:id", controller.getTriggerById);

// //get all triggers by user_id
router.get("/users/:user_id", controller.getAllTriggersForUser);

router.post("/", controller.addTrigger);

module.exports = router;
