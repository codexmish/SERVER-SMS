const express = require("express");
const {
  getUserController,
  approveUserController,
} = require("../../controllers/adminController");
const router = express.Router();

// -------getting all user data
router.get("/users", getUserController);
// -------aprroving user
router.patch("/approve/:id", approveUserController);

module.exports = router;
