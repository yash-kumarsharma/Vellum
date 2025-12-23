const express = require("express");
const router = express.Router();
const auth = require("../../middlewares/auth.middleware");
const controller = require("./exports.controller");

router.get("/:formId/excel", auth, controller.exportExcel);

module.exports = router;
