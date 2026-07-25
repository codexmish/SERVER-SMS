const express = require("express");
const { signupController, otpVerifyController, resendOtpController, signInController } = require("../../controllers/authController");

const router = express.Router();


// -----signup router
router.post("/signup", signupController);
// -----otp verify router
router.post("/otp-verify", otpVerifyController)
// -----resend otp router
router.post("/resend-otp", resendOtpController)
// -----signIn router
router.post("/signin", signInController)

module.exports = router;