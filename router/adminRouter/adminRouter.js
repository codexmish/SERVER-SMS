const express = require("express");
const {
  getUserController,
  approveUserController,
  deleteUserController,
  getPendingUsersController,
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

module.exports = router;
