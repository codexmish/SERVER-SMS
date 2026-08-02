const {
  signupServices,
  otpVerifyServices,
  resendOtpServices,
  signInServices,
  getProfileServices,
  updateProfileServices,
  forgetPasswordServices,
  resetPasswordServices,
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

// -----login controller
const signInController = async (req, res) => {
  try {
    const result = await signInServices(req.body);

    const { accessToken, refreshToken } = result;

    res.cookie("accessToken", accessToken);

    res.cookie("refreshToken", refreshToken);

    sendRes(res, {
      statusCode: 200,
      success: true,
      message: "login successfully",
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

// ------get profile controller
const getProfileController = async (req, res) => {
  try {
    const id = req.user.data.id;

    const result = await getProfileServices(id);

    sendRes(res, {
      statusCode: 200,
      success: true,
      message: "User data find successfully",
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

// -----update profile controller
const updateProfileController = async (req, res) => {
  try {
    const userId = req.user.data.id;
    const avaterData = req.file;

    const result = await updateProfileServices(req.body, userId, avaterData);

    sendRes(res, {
      statusCode: 200,
      success: true,
      message: "User data updated successfully",
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

// ----reset password controller
const resetPasswordController = async (req, res) => {
  try {
    const { newpassword } = req.body;
    const { token } = req.params;
    const result = await resetPasswordServices(newpassword, token);
    sendRes(res, {
      statusCode: 200,
      success: true,
      message: "New password set successfully",
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

// -------forget password controller
const forgetPasswordController = async (req, res) => {
  try {
    const result = await forgetPasswordServices(req.body);
    sendRes(res, {
      statusCode: 200,
      success: true,
      message: "Check email for set new pass",
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

module.exports = {
  signupController,
  otpVerifyController,
  resendOtpController,
  signInController,
  getProfileController,
  updateProfileController,
  resetPasswordController,
  forgetPasswordController,
};
