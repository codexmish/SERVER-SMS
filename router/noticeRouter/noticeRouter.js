const express = require("express");
const authMiddleware = require("../../middlewares/authMiddleware");
const roleCheckMiddleware = require("../../middlewares/roleCheckMiddleware");
const {
  createNoticeController,
  getAllNoticeController,
  getSingleNoticeController,
} = require("../../controllers/noticeController");
const multer = require("multer");
const upload = multer();

const router = express.Router();

// -----create notice
router.post(
  "/create",
  authMiddleware,
  roleCheckMiddleware(["ADMIN"]),
  upload.single("image"),
  createNoticeController,
);

// -----get all notice
router.get("/allnotice", getAllNoticeController);
// -----get single notice
router.post("/notice/:id", getSingleNoticeController);

module.exports = router;
