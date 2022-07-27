const { Router } = require("express");
const controller = require("./controller");
const router = Router();

router.get("/", controller.getSymptomEntries);

router.get("/:id", controller.getSymptomEntryById);

//post request (use for when they START a daily entry, like pressing start button send s request)
router.post("/", controller.addSymptomEntry);

module.exports = router;
