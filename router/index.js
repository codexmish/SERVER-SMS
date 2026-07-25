const express = require("express");
const envConfig = require("../helpers/envConfig");
const router = express.Router()
const authRoute = require("./authRouter");

router.use(envConfig.BASE_URL, authRoute);

module.exports = router;