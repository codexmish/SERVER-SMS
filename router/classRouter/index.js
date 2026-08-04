const express = require("express");
const router = express.Router();

const classR = require("./classRouter");
const authMiddleware = require("../../middlewares/authMiddleware");

router.use("/class", authMiddleware, classR);

module.exports = router;
