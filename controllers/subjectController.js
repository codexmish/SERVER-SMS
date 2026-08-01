const { createSubjectServices } = require("../services/subjectServices");
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

module.exports = { createSubjectConroller };
