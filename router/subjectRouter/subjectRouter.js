const express = require("express");
const {
  createSubjectConroller,
} = require("../../controllers/subjectController");
const authMiddleware = require("../../middlewares/authMiddleware");
const roleCheckMiddleware = require("../../middlewares/roleCheckMiddleware");

const router = express.Router();

// -----create subject
router.post(
  "/create",
  authMiddleware,
  roleCheckMiddleware(["ADMIN"]),
  createSubjectConroller,
);

module.exports = router;
