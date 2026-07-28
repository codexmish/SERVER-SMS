const {
  getUserServices,
  approveUserServices,
} = require("../services/adminService");
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

// ------approving user
const approveUserController = async (req, res) => {
  try {
    const result = await approveUserServices(req.params.id);

    sendRes(res, {
      statusCode: 200,
      success: true,
      message: "User approved successfully",
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

module.exports = { getUserController, approveUserController };
