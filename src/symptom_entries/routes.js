const { Router } = require("express");
const controller = require("./controller");
const router = Router();

router.get("/", controller.getSymptomEntries);

router.get("/:id?", controller.getSymptomEntryById);

// get all entries by symptom_id
router.get("/symptoms/:symptom_id", controller.getAllEntriesForSymptom);

router.get("/last", controller.getlastSymptomEntry);

router.delete("/:id", controller.deleteSymptomEntry);

router.post("/", controller.addSymptomEntry);

module.exports = router;
