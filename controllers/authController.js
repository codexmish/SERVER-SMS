const {
  signupServices,
  otpVerifyServices,
  resendOtpServices,
} = require("../services/authServices");
const { sendRes } = require("../utils/sendRes");

// -----signup Controller
const signupController = async (req, res) => {
  try {
    const result = await signupServices(req.body);

    if (result.errors) {
      sendRes(res, {
        statusCode: 400,
        success: false,
        message: "please provide all correct data",
        error: result.errors,
      });
    }

    sendRes(res, {
      statusCode: 200,
      success: true,
      message: "user created successfully",
      data: result,
    });
  } catch (error) {
    sendRes(res, {
      statusCode: 500,
      success: false,
      message: error.message,
      error: error,
    });
  }
};

// -----otp-verify controller
const otpVerifyController = async (req, res) => {
  try {
    const result = await otpVerifyServices(req.body);

    if (result.errors) {
      sendRes(res, {
        statusCode: 400,
        success: false,
        message: "please provide all correct data",
        error: result.errors,
      });
    }

    sendRes(res, {
      statusCode: 200,
      success: true,
      message: "OTP verified successfully",
      data: result,
    });
  } catch (error) {
    sendRes(res, {
      statusCode: 500,
      success: false,
      message: error.message,
      error: error,
    });
  }
};

// -----resend otp controller
const resendOtpController = async (req, res) => {
  try {
    const result = await resendOtpServices(req.body);

    if (result.errors) {
      sendRes(res, {
        statusCode: 400,
        success: false,
        message: "please provide all correct data",
        error: result.errors,
      });
    }

    sendRes(res, {
      statusCode: 200,
      success: true,
      message: "OTP Resend done. check your email",
      data: result,
    });
  } catch (error) {
    sendRes(res, {
      statusCode: 500,
      success: false,
      message: error.message,
      error: error,
    });
  }
};

module.exports = { signupController, otpVerifyController, resendOtpController };
