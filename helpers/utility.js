const crypto = require("crypto");

// ---email razex
function isValidateEmail(email) {
  const emailRagex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRagex.test(email);
}

// ---password razex
function isValidatePassword(password) {
  const passwordRagex = /^.{6,}$/;
  return passwordRagex.test(password);
}

// ---otp generator
const generateOTP = () => {
  return crypto.randomInt(1000, 10000).toString();
};

// ----generate reset pass token
const generateResetPasswordToken = () => {
  const resetToken = crypto.randomBytes(16).toString("hex");
  const hashedToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  return { resetToken, hashedToken };
};

// ----hash Reset Token

const hashResetToken = (token) => {
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
  return hashedToken;
};

module.exports = {
  isValidateEmail,
  isValidatePassword,
  generateOTP,
  generateResetPasswordToken,
  hashResetToken
};
