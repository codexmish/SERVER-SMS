const {
  uploadToCloudinary,
  destroyFromCloudinary,
} = require("../helpers/cloudinaryService");
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

// ------get all notice services
const getAllNoticeServices = async () => {
  const allNotice = await noticeSchema.find();

  if (allNotice.length == 0) {
    throw new Error("No notice found");
  }

  return allNotice;
};

// ------get single notice services
const getSingleNoticeServices = async (id) => {
  const notice = await noticeSchema.findById(id);

  if (!notice) {
    throw new Error("Notice not exist");
  }

  return notice;
};

// ------update notice services
const updateNoticeServices = async (payload, image, noticeId) => {
  const { title, description } = payload;

  // ---checking if notice exisst
  const noticeExist = await noticeSchema.findById(noticeId);

  if (!noticeExist) {
    throw new Error("notice not exist");
  }

  // ------geting update data
  const updatedATA = {};

  if (title) updatedATA.title = title;
  if (description) updatedATA.description = description;

  if (image) {
    // -----upload image to cloudinary
    const imageUrl = await uploadToCloudinary(image);
    if (!imageUrl) {
      throw new Error("Something went wrong");
    }

    updatedATA.image = imageUrl;
  }

  // -----updating data if data exist for update
  if (Object.keys(updatedATA).length > 0) {
    const updatedNotice = await noticeSchema.findByIdAndUpdate(
      noticeId,
      updatedATA,
      {
        returnDocument: "after",
        runValidators: true,
      },
    );

    // ----destroying preveous avater ulr if user update new avater
    if (updatedNotice.image) {
      await destroyFromCloudinary(noticeExist.image);
    }

    return updatedNotice;
  } else {
    throw new Error("Give data for update");
  }
};

// ----delete notice services
const deleteNoticeServices = async (noticeId) => {
  // -----checkking if noticeExist
  const existNotice = await noticeSchema.findById(noticeId);

  if (!existNotice) {
    throw new Error("Notice not exist");
  }

  // ------deleting notice
  const result = await noticeSchema.findByIdAndDelete(noticeId);
  return result;
};

// -----add like services
const addLikeServices = async (noticeId, userId) => {
  // -----checking if notice exist
  const existNotice = await noticeSchema.findById(noticeId);

  if (!existNotice) {
    throw new Error("Notice not exist");
  }

  // ------checking if already liked
  if (existNotice.likers.includes(userId)) {
    const index = existNotice.likers.indexOf(userId);
    existNotice.likers.splice(index, 1);
  } else {
    existNotice.likers.push(userId);
  }

  existNotice.like = existNotice.likers.length;
  existNotice.save();
  return existNotice;
};

module.exports = {
  createNoticeServices,
  getAllNoticeServices,
  getSingleNoticeServices,
  updateNoticeServices,
  deleteNoticeServices,
  addLikeServices,
};
