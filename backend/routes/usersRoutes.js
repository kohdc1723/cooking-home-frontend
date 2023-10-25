const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");
const verifyToken = require("../middlewares/verifyToken");

router.route("/").post(usersController.createUser);

router.use(verifyToken);
router.route("/:id").get(usersController.getUser);
router.route("/").patch(usersController.updateUser);
router.route("/").delete(usersController.deleteUser);

module.exports = router;