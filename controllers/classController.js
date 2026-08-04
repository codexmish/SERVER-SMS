const {
  createClassServices,
  getAllClassServices,
  getSingleClassServices,
  updateClassServices,
  deleteClassServices,
} = require("../services/classServices");
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
      statusCode: 201,
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

// ------get all class
const getAllClassController = async (req, res) => {
  try {
    const result = await getAllClassServices();

    sendRes(res, {
      statusCode: 200,
      success: true,
      message: "all class get successfully",
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

// ------get single class
const getSingleClassController = async (req, res) => {
  try {
    const classId = req.params.id;

    const result = await getSingleClassServices(classId);

    sendRes(res, {
      statusCode: 200,
      success: true,
      message: "single class get successfully",
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

// ------update class controller
const updateClassController = async (req, res) => {
  try {
    const result = await updateClassServices(req.body, req.params.id);

    sendRes(res, {
      statusCode: 200,
      success: true,
      message: "Class data updated successfully",
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

const deleteClassController = async (req, res) => {
  try {
    const result = await deleteClassServices(req.params.id);

    sendRes(res, {
      statusCode: 200,
      success: true,
      message: "Class deleted successfully",
      //   data: result,
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
  createClassController,
  getAllClassController,
  getSingleClassController,
  updateClassController,
  deleteClassController,
};
