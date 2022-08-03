const { Router } = require("express");
const controller = require("./controller");
const router = Router();

router.get("/", controller.getSymptomEntries);

router.get("/:id", controller.getSymptomEntryById);

router.post("/", controller.addSymptomEntry);

module.exports = router;
