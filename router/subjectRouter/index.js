const express = require("express");
const router = express.Router();

const sub = require("./subjectRouter");
const authMiddleware = require("../../middlewares/authMiddleware");
const roleCheckMiddleware = require("../../middlewares/roleCheckMiddleware");

router.use("/subject", authMiddleware, roleCheckMiddleware(["ADMIN"]), sub);

module.exports = router;
