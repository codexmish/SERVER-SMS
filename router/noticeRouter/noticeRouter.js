const express = require("express");
const authMiddleware = require("../../middlewares/authMiddleware");
const roleCheckMiddleware = require("../../middlewares/roleCheckMiddleware");
const {
  createNoticeController,
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

module.exports = router;
