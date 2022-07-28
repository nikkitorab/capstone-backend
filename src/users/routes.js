const { Router } = require("express");
const controller = require("./controller");
const router = Router();

// GET USERS
router.get("/", controller.getUsers);

// router.get("/:email", controller.getUserByEmail);

//get all symptoms by user_id
// router.get("/symptoms/:id", controller.getAllSymptomsForUser);

// CREATE NEW USER
router.post("/", controller.addUser);

// LOGIN EXISTING USER
router.post("/login", controller.loginUser);

module.exports = router;
