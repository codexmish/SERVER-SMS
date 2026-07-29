const express = require("express");
const {
  getUserController,
  approveUserController,
  deleteUserController,
  getPendingUsersController,
  getAllApprovedUserController,
  getAllStudentController,
  getAllTeacherController,
} = require("../../controllers/adminController");
const router = express.Router();

// -------getting all user data
router.get("/users", getUserController);
// -------aprroving user
router.patch("/approve/:id", approveUserController);
// -------delete user
router.delete("/delete/:id", deleteUserController);
// -------get pending users
router.get("/pending", getPendingUsersController);
// -------get all approved users
router.get("/approved-user", getAllApprovedUserController);
// ------get all students
router.get("/students", getAllStudentController);
// ------get all teacher
router.get("/teacher", getAllTeacherController);

module.exports = router;
