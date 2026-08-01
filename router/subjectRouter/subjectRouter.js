const express = require("express");
const {
  createSubjectConroller,
  getSubjectConroller,
  deleteSubjectConroller,
} = require("../../controllers/subjectController");
const router = express.Router();

// -----create subject
router.post("/create", createSubjectConroller);
// -----------get subject
router.get("/subjectlist", getSubjectConroller);
// ------delete subject
router.delete("/delete/:id", deleteSubjectConroller)

module.exports = router;
