const express = require("express");
const { createClassController } = require("../../controllers/classController");
const roleCheckMiddleware = require("../../middlewares/roleCheckMiddleware");

const router = express.Router();

// -------create class
router.post("/create", roleCheckMiddleware(["ADMIN"]), createClassController);

module.exports = router;
