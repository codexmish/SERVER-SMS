const express = require("express");
const router = express.Router();

const sub = require("./subjectRouter");

router.use("/subject", sub);

module.exports = router;
