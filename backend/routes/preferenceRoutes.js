const express = require("express");
const router = express.Router();
const preferenceController = require("../controllers/preferenceController");
const verifyToken = require("../middlewares/verifyToken");

router.use(verifyToken);

router.route("/:id").get(preferenceController.getPreference);
router.route("/").post(preferenceController.createPreference);
router.route("/").patch(preferenceController.updatePreference);

module.exports = router;