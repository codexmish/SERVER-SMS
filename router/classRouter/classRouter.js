const express = require("express");
const {
  createClassController,
  getAllClassController,
  getSingleClassController,
  updateClassController,
  deleteClassController,
} = require("../../controllers/classController");
const roleCheckMiddleware = require("../../middlewares/roleCheckMiddleware");

const router = express.Router();

// -------create class
router.post("/create", roleCheckMiddleware(["ADMIN"]), createClassController);
// -------get all class
router.get("/classes", roleCheckMiddleware(["ADMIN", "TEACHER"]), getAllClassController);
// -------get single class
router.post("/class/:id", roleCheckMiddleware(["ADMIN", "TEACHER"]), getSingleClassController);
// ------update class
router.patch("/update/:id", roleCheckMiddleware(["ADMIN"]), updateClassController)
// -----delete class
router.delete("/delete/:id", roleCheckMiddleware(["ADMIN"]), deleteClassController)

module.exports = router;
