const express = require("express");
const {
  getUserController,
  approveUserController,
  deleteUserController,
  getPendingUsersController,
  getAllApprovedUserController,
} = require("../../controllers/adminController");
const router = express.Router();

// -------getting all user data
router.get("/users", getUserController);
// -------aprroving user
router.patch("/approve/:id", approveUserController);
// -------delete user
router.delete("/delete/:id", deleteUserController);
// -------get pending users
router.get("/pending", getPendingUsersController)
// -------get all approved users 
router.get("/approved-user", getAllApprovedUserController)

module.exports = router;
