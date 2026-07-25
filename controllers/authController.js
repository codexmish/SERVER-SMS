// -----signup Controller

const { signupServices } = require("../services/authServices");
const { sendRes } = require("../utils/sendRes");

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

module.exports = { signupController };
