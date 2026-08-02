const express = require("express");
const multer = require("multer");
const upload = multer();
const {
  signupController,
  otpVerifyController,
  resendOtpController,
  signInController,
  getProfileController,
  updateProfileController,
  forgetPasswordController,
  resetPasswordController,
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
router.get("/me", authMiddleware, getProfileController);
// -----update profile
router.patch(
  "/update-profile",
  authMiddleware,
  upload.single("avatar"),
  updateProfileController,
);
// ---------forget password
router.patch("/forgetpass", forgetPasswordController);
// ---------reset password
router.patch("/resetpass/:token", resetPasswordController);

module.exports = router;
