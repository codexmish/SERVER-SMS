const { createClassServices } = require("../services/classServices");
const { sendRes } = require("../utils/sendRes");

// ----create class controller
const createClassController = async (req, res) => {
  try {
    const result = await createClassServices(req.body, req.user.data.id);

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
      message: "Class created successfully",
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

module.exports = { createClassController };
