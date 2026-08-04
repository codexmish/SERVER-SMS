const {
  createNoticeServices,
  getAllNoticeServices,
  getSingleNoticeServices,
  updateNoticeServices,
  deleteNoticeServices,
  addLikeServices,
  addDislikeServices,
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

// ------update notice controller
const updateNoticeController = async (req, res) => {
  try {
    const noticeId = req.params.id;
    const image = req.file;
    const result = await updateNoticeServices(req.body, image, noticeId);

    sendRes(res, {
      statusCode: 200,
      success: true,
      message: "Notice update successfully",
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

// ------delete notice controller
const deleteNoticeController = async (req, res) => {
  try {
    const noticeId = req.params.id;
    const result = await deleteNoticeServices(noticeId);

    sendRes(res, {
      statusCode: 200,
      success: true,
      message: "Notice deleted successfully",
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

// -----add like controller
const addLikeController = async (req, res) => {
  try {
    const noticeId = req.params.id;
    const userId = req.user.data.id;
    const result = await addLikeServices(noticeId, userId);

    sendRes(res, {
      statusCode: 200,
      success: true,
      message: "Notice like updated successfully",
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

// -----add dislike controller
const addDislikeController = async (req, res) => {
  try {
    const noticeId = req.params.id;
    const userId = req.user.data.id;
    const result = await addDislikeServices(noticeId, userId);

    sendRes(res, {
      statusCode: 200,
      success: true,
      message: "Notice Dislike updated successfully",
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
  updateNoticeController,
  deleteNoticeController,
  addLikeController,
  addDislikeController,
};
