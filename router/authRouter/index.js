const express = require("express");
const router = express.Router();

const auth = require("./authRouter");

router.use("/auth", auth);



module.exports = router;