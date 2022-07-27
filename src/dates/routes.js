//dates routes

const { Router } = require("express");
//import controller
const controller = require("./controller");
const router = Router();

router.get("/", controller.getDates);
//query database, get json response from dates, send it back

//get date by id
router.get("/:id", controller.getDateById);

//post request (use for when they START a daily entry, like pressing start button send s request)
router.post("/", controller.addDate);

module.exports = router;
