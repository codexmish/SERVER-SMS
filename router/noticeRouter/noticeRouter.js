const express = require("express");
const roleCheckMiddleware = require("../../middlewares/roleCheckMiddleware");
const {
  createNoticeController,
  getAllNoticeController,
  getSingleNoticeController,
  updateNoticeController,
  deleteNoticeController,
} = require("../../controllers/noticeController");
const multer = require("multer");
const upload = multer();

const router = express.Router();

// -----create notice
router.post(
  "/create",
  roleCheckMiddleware(["ADMIN"]),
  upload.single("image"),
  createNoticeController,
);

// -----get all notice
router.get("/allnotice", getAllNoticeController);
// -----get single notice
router.post("/notice/:id", getSingleNoticeController);
// -----update notice
router.patch(
  "/update/:id",
  roleCheckMiddleware(["ADMIN"]),
  upload.single("image"),
  updateNoticeController,
);

// -----delete notice
router.delete(
  "/delete/:id",
  roleCheckMiddleware(["ADMIN"]),
  deleteNoticeController,
);

module.exports = router;
