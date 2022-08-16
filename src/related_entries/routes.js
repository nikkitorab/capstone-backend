const { Router } = require("express");
const controller = require("./controller");
const analysis = require("./analysis");

const router = Router();

router.get("/", controller.getAllRelatedEntries);

router.post("/", controller.addRelatedEntries);

router.get("/symptom-entries/:id", controller.getSymptomEntryById);

router.get("/data", analysis.getAllOutputData);
router.get("/data/sig", analysis.getSignificantData);

router.delete("/data/:id", analysis.deleteData);

router.get("/data/sig/trigger/:id", analysis.getSignificantDataForTrigger);

router.get("/data/sig/trigger", analysis.getSignificantTriggers);

// make new related entry
router.post("/", controller.postEntries);

module.exports = router;
