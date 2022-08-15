const { Router } = require("express");
const controller = require("./controller");
const analysis = require("./analysis");

const router = Router();

// router.get("/", controller.getSymptoms);
router.get("/", controller.getAllRelatedEntries);

router.post("/", controller.addRelatedEntries);

// router.get("/symptom-entries/:symptomEntryID", controller.addRelated);
router.get("/symptom-entries/:id", controller.getSymptomEntryById);

// router.get("/symptom/:id", controller.getRelatedEntriesSymptomID);

router.get("/data", analysis.getAllOutputData);
router.get("/data/sig", analysis.getSignificantData);

router.delete("/data/:id", analysis.deleteData);

router.get("/data/sig/trigger/:id", analysis.getSignificantDataForTrigger);

router.get("/data/sig/trigger", analysis.getSignificantTriggers);

// router.get("/data/sig/symptom", controller.getSignifSymptomNames);

// make new related entry
router.post("/", controller.postEntries);

// router.get("/triggers", controller.getRelatedTriggerEntries);

// addRelated
// router.get("/symptoms/:symptom_id", controller.getEntriesBySymptom);
// router.get("/triggers/:trigger_id", controller.getEntriesByTrigger);

module.exports = router;
