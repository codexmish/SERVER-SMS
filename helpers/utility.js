const crypto = require ("crypto")

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

module.exports = { isValidateEmail, isValidatePassword, generateOTP };