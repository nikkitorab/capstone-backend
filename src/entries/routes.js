const { Router } = require("express");
const controller = require("./controller");

const router = Router();

// router.get("/", controller.getSymptoms);
router.get("/", controller.getEntriesData);

router.get("/symptoms/:symptom_id", controller.getEntriesBySymptom);
router.get("/triggers/:trigger_id", controller.getEntriesByTrigger);

router.delete("/:id", controller.deleteEntryData);

module.exports = router;
