const { Router } = require("express");
const controller = require("./controller");

const router = Router();

router.get("/", controller.getSymptoms);

//get symptom by id
router.get("/:id", controller.getSymptomById);

// get all symptoms by user_id
router.get("/users/:user_id", controller.getAllSymptomsForUser);

// make new symptom
router.post("/", controller.addSymptom);

// delete symptom by id
router.delete("/:id", controller.deleteSymptomById);

// module.exports = {
//   router,
//   entriesController
// }
module.exports = router;
