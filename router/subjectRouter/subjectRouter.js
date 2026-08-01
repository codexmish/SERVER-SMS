const express = require("express");
const {
  createSubjectConroller,
  getSubjectConroller,
} = require("../../controllers/subjectController");
const router = express.Router();

// -----create subject
router.post("/create", createSubjectConroller);
// -----------get subject
router.get("/subjectlist", getSubjectConroller);

module.exports = router;
