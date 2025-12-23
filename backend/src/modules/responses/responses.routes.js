const express = require("express");
const router = express.Router();
const controller = require("./responses.controller");
const auth = require("../../middlewares/auth.middleware");

// Public submission (NO AUTH)
router.post("/:formId", controller.submit);

// Admin-only view
router.get("/:formId", auth, controller.list);

module.exports = router;
