const {
  createSubjectServices,
  getSubjectServices,
  deleteSubjectServices,
  updateSubjectServices,
  getSingleSubjectServices,
} = require("../services/subjectServices");
const { sendRes } = require("../utils/sendRes");

// ---------create subject
const createSubjectConroller = async (req, res) => {
  try {
    const result = await createSubjectServices(req.body, req.user.data.id);

    sendRes(res, {
      statusCode: 201,
      success: true,
      message: "New subject created successfully",
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

// -------get subject controller
const getSubjectConroller = async (req, res) => {
  try {
    const result = await getSubjectServices();

    sendRes(res, {
      statusCode: 200,
      success: true,
      message: "All subject list successfully",
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

// -------delete subject controller
const deleteSubjectConroller = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await deleteSubjectServices(id);

    sendRes(res, {
      statusCode: 200,
      success: true,
      message: "Subject deleted successfully",
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

// -------update subject controller
const updateSubjectConroller = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await updateSubjectServices(req.body, id);

    sendRes(res, {
      statusCode: 200,
      success: true,
      message: "Subject data updated successfully",
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

// ------get single subject controller
const getSingleSubjectConroller = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await getSingleSubjectServices(id);
    sendRes(res, {
      statusCode: 200,
      success: true,
      message: "Subject data get successfully",
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

module.exports = {
  createSubjectConroller,
  getSubjectConroller,
  deleteSubjectConroller,
  updateSubjectConroller,
  getSingleSubjectConroller,
};
