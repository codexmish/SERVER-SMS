const express = require("express");
const envConfig = require("../helpers/envConfig");
const router = express.Router();
const authRoute = require("./authRouter");
const adminRouter = require("./adminRouter");

router.use(envConfig.BASE_URL, authRoute);
router.use(envConfig.BASE_URL, adminRouter);

module.exports = router;
