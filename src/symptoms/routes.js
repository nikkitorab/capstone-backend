//dates routes

const { Router } = require("express");
//import controller
const controller = require("./controller");
const router = Router();

router.get("/", controller.getSymptoms);
//query database, get json response from dates, send it back

//get date by id
// router.get("/:id", controller.getSymptomById);

//post request (use for when they START a daily entry, like pressing start button send s request)
// router.post("/", controller.addSymptom);
router.post("/", controller.addSymptom);

module.exports = router;
