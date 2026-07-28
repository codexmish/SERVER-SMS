const express = require("express");
const router = express.Router();

const admin = require("./adminRouter");

router.use("/admin", admin);

module.exports = router;
