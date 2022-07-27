const { Router } = require("express");
const controller = require("./controller");
const router = Router();

router.get("/", controller.getSymptoms);

//get symptom_entry by id
router.get("/:id", controller.getSymptomById);

router.post("/", controller.addSymptom);

module.exports = router;
