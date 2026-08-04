const express = require("express");
const {
  createClassController,
  getAllClassController,
  getSingleClassController,
} = require("../../controllers/classController");
const roleCheckMiddleware = require("../../middlewares/roleCheckMiddleware");

const router = express.Router();

// -------create class
router.post("/create", roleCheckMiddleware(["ADMIN"]), createClassController);
// -------get all class
router.get("/classes", roleCheckMiddleware(["ADMIN", "TEACHER"]), getAllClassController);
// -------get single class
router.post("/class/:id", roleCheckMiddleware(["ADMIN", "TEACHER"]), getSingleClassController);

module.exports = router;
