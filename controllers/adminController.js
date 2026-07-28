const { getUserServices } = require("../services/adminService");
const { sendRes } = require("../utils/sendRes");

// -----get all users controller
const getUserController = async (req, res) => {
  try {
    const allUsers = await getUserServices();

    sendRes(res, {
      statusCode: 200,
      success: true,
      message: "All users get successfully",
      data: allUsers,
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

module.exports = { getUserController };
