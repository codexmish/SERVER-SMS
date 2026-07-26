const express = require("express");
const {
  signupController,
  otpVerifyController,
  resendOtpController,
  signInController,
  getProfileController,
} = require("../../controllers/authController");
const authMiddleware = require("../../middlewares/authMiddleware");

const router = express.Router();

// -----signup router
router.post("/signup", signupController);
// -----otp verify router
router.post("/otp-verify", otpVerifyController);
// -----resend otp router
router.post("/resend-otp", resendOtpController);
// -----signIn router
router.post("/signin", signInController);
// -----get profile router
router.get("/me",authMiddleware, getProfileController);

module.exports = router;
