const express = require("express");
const envConfig = require("../helpers/envConfig");
const router = express.Router();
const authRoute = require("./authRouter");
const adminRouter = require("./adminRouter");
const subjectRouter = require("./subjectRouter");
const noticeRouter = require("./noticeRouter");
const classRouter = require("./classRouter")
const rateLimit = require("express-rate-limit");

// ----------set api req limit
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  limit: 2, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
  message: { error: "Too many requests, please try again later." },
  skipSuccessfulRequests: true,
});

router.use(envConfig.BASE_URL, limiter, authRoute);
router.use(envConfig.BASE_URL, adminRouter);
router.use(envConfig.BASE_URL, subjectRouter);
router.use(envConfig.BASE_URL, noticeRouter);
router.use(envConfig.BASE_URL, classRouter);

module.exports = router;
