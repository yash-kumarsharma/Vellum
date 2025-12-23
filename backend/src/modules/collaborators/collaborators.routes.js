const express = require("express");
const router = express.Router();
const auth = require("../../middlewares/auth.middleware");
const controller = require("./collaborators.controller");

router.post("/:formId", auth, controller.add);
router.get("/:formId", auth, controller.list);

module.exports = router;
