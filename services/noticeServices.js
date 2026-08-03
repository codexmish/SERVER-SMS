const { uploadToCloudinary } = require("../helpers/cloudinaryService");
const noticeSchema = require("../models/noticeSchema");

// -------create Notice
const createNoticeServices = async (payload, image, adminId) => {
  const { title, description } = payload;

  // ----get a empty obj for all validation errors togather
  const errors = {};

  // --- validatine
  if (!title) {
    errors.title = "title is required";
  }

  if (!description) {
    errors.description = "description is required";
  }

  // --------sending errors
  if (Object.keys(errors).length > 0) {
    return { errors: errors };
  }

  // ------geting notice data
  const noticeData = {};

  noticeData.title = title;
  noticeData.description = description;
  noticeData.creatorId = adminId;

  if (image) {
    // -----upload image to cloudinary
    const imageUrl = await uploadToCloudinary(image);
    if (!imageUrl) {
      throw new Error("Something went wrong");
    }

    noticeData.image = imageUrl;
  }

  // -----Creating notice if data exist
  if (Object.keys(noticeData).length > 0) {
    const notice = await noticeSchema.create(noticeData);
    return notice;
  } else {
    throw new Error("Give data for create notice");
  }
};

module.exports = { createNoticeServices };
