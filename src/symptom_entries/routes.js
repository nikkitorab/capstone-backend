const { Router } = require("express");
const controller = require("./controller");
const router = Router();

router.get("/", controller.getSymptomEntries);

router.get("/:id", controller.getSymptomEntryById);

// get all entries by symptom_id
router.get("/symptoms/:symptom_id", controller.getAllEntriesForSymptom);

router.get("/last", controller.getlastSymptomEntry);

// DELETE all entries by symptom_id
// router.delete("/symptoms/:symptom_id", controller.deleteAllEntriesForSymptom);

// delete entry by id
router.delete("/:id", controller.deleteSymptomEntry);

router.post("/", controller.addSymptomEntry);

module.exports = router;
