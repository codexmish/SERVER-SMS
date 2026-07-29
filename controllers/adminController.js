const {
  getUserServices,
  approveUserServices,
  deleteUserService,
  getPendingUsersServices,
  getAllApprovedUserServices,
  getAllStudentsServices,
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

// ------approving user controller
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

// -------delete users controller
const deleteUserController = async (req, res) => {
  try {
    const result = await deleteUserService(req.params.id);

    sendRes(res, {
      statusCode: 200,
      success: true,
      message: "User Deleted successfully",
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

// -------get pending users controller
const getPendingUsersController = async (req, res) => {
  try {
    const result = await getPendingUsersServices();

    sendRes(res, {
      statusCode: 200,
      success: true,
      message: "All pending users",
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

// ------get all approved user controller
const getAllApprovedUserController = async (req, res) => {
  try {
    const result = await getAllApprovedUserServices();

    sendRes(res, {
      statusCode: 200,
      success: true,
      message: "All approved users get successfully",
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

// -----get all student controller
const getAllStudentController = async (req, res)=>{
  try {
    const result = await getAllStudentsServices()

    sendRes(res, {
      statusCode: 200,
      success: true,
      message: "All Studentss get successfully",
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
}

module.exports = {
  getUserController,
  approveUserController,
  deleteUserController,
  getPendingUsersController,
  getAllApprovedUserController,
  getAllStudentController
};
