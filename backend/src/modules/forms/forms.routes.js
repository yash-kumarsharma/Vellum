const express = require("express");
const router = express.Router();
const controller = require("./forms.controller");
const auth = require("../../middlewares/auth.middleware");

router.post("/", auth, controller.create);
router.get("/", auth, controller.list);
router.get("/public/:id", controller.getPublic);


module.exports = router;
