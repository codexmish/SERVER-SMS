const express = require("express");
const router = express.Router();

const notice = require("./noticeRouter");

router.use("/notice", notice);



module.exports = router;