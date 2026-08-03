const express = require("express");
const authMiddleware = require("../../middlewares/authMiddleware");
const roleCheckMiddleware = require("../../middlewares/roleCheckMiddleware");
const { createNoticeController } = require("../../controllers/noticeController");

const router = express.Router();

// -----create notice
router.post("/create", authMiddleware, roleCheckMiddleware(["ADMIN"]), createNoticeController);


module.exports = router;
