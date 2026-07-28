const express = require("express");
const {
  getUserController,
  approveUserController,
  deleteUserController,
} = require("../../controllers/adminController");
const router = express.Router();

// -------getting all user data
router.get("/users", getUserController);
// -------aprroving user
router.patch("/approve/:id", approveUserController);
// -------delete user
router.delete("/delete/:id", deleteUserController);

module.exports = router;
