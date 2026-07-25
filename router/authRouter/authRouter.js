const express = require("express");
const { signupController, otpVerifyController } = require("../../controllers/authController");

const router = express.Router();


// -----signup router
router.post("/signup", signupController);
// -----otp verify router
router.post("/otp-verify", otpVerifyController)

module.exports = router;