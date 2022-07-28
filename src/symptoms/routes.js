const { Router } = require("express");
const controller = require("./controller");
const router = Router();

router.get("/", controller.getSymptoms);

//get symptom by id
router.get("/:id", controller.getSymptomById);

// //get all symptoms by user_id
router.get("/users/:user_id", controller.getAllSymptomsForUser);

router.post("/", controller.addSymptom);

module.exports = router;
