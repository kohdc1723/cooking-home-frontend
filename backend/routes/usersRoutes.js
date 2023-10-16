const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");

router.route("/").get(usersController.getAllUsers);
router.route("/:id").get(usersController.getUser);
router.route("/").post(usersController.createUser);
// router.route("/").patch(usersController.updateUser);

module.exports = router;