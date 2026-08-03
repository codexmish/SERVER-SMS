const {
  createNoticeServices,
  getAllNoticeServices,
  getSingleNoticeServices,
} = require("../services/noticeServices");
const { sendRes } = require("../utils/sendRes");

// --------create notice controller
const createNoticeController = async (req, res) => {
  try {
    const image = req.file;
    const adminId = req.user.data.id;
    const result = await createNoticeServices(req.body, image, adminId);

    sendRes(res, {
      statusCode: 201,
      success: true,
      message: "Notice created successfully",
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

// ------get all notice controller
const getAllNoticeController = async (req, res) => {
  try {
    const result = await getAllNoticeServices();

    sendRes(res, {
      statusCode: 200,
      success: true,
      message: "Notice get successfully",
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

// ------get singel notice controller
const getSingleNoticeController = async (req, res) => {
  try {
    const noticeId = req.params.id;
    const result = await getSingleNoticeServices(noticeId);

    sendRes(res, {
      statusCode: 200,
      success: true,
      message: "Notice get successfully",
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
  createNoticeController,
  getAllNoticeController,
  getSingleNoticeController,
};
