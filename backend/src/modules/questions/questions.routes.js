const express = require("express");
const router = express.Router();
const controller = require("./questions.controller");
const auth = require("../../middlewares/auth.middleware");

router.post("/:formId", auth, controller.add);
router.get("/:formId", auth, controller.list);
router.put("/:id", auth, controller.update);
router.delete("/:id", auth, controller.remove);

module.exports = router;
