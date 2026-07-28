const express = require("express");
const router = express.Router();

const admin = require("./adminRouter");
const authMiddleware = require("../../middlewares/authMiddleware");
const roleCheckMiddleware = require("../../middlewares/roleCheckMiddleware");

router.use("/admin", authMiddleware, roleCheckMiddleware(["ADMIN"]), admin);

module.exports = router;
