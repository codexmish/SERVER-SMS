const cloudinary = require("../config/cloudinaryConfig");

// ---------cloudinary upload
const uploadToCloudinary = async ({ mimetype, buffer }) => {
  const dataUrl = `data:${mimetype};base64,${buffer.toString("base64")}`;
  // console.log(dataUrl);

  const avaterData = await cloudinary.uploader.upload(
    dataUrl,
    (error, result) => {
      if (error) {
        throw new Error("Image upload failed cloudinary");
      }
    },
  );

  return avaterData.secure_url;
};

// --------cloudinary destroy

const destroyFromCloudinary = (url) => {
  const publicId = url.split("/").pop().split(".").shift();

  cloudinary.uploader.destroy(publicId, (error, result) => {
    if (error) {
      throw new Error("Image destroy failed cloudinary");
    }
  });
};

module.exports = { uploadToCloudinary, destroyFromCloudinary };
