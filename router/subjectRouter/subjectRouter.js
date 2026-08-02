const express = require("express");
const {
  createSubjectConroller,
  getSubjectConroller,
  deleteSubjectConroller,
  updateSubjectConroller,
  getSingleSubjectConroller,
} = require("../../controllers/subjectController");
const router = express.Router();

// -----create subject
router.post("/create", createSubjectConroller);
// -----------get subject
router.get("/subjectlist", getSubjectConroller);
// ------delete subject
router.delete("/delete/:id", deleteSubjectConroller);
// -----update subject
router.patch("/update/:id", updateSubjectConroller);
// ------get single subject
router.get("/subject/:id", getSingleSubjectConroller);

module.exports = router;
