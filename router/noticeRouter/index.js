const express = require("express");
const router = express.Router();

const notice = require("./noticeRouter");
const authMiddleware = require("../../middlewares/authMiddleware");

router.use("/notice",authMiddleware, notice);



module.exports = router;