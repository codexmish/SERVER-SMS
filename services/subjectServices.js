const subjectSchema = require("../models/subjectSchema");

// ------create subject
const createSubjectServices = async (payload, adminId) => {
  const { name, code, credit, description } = payload;

  // ----get a empty obj for all validation errors togather
  const errors = {};

  // --- validatine
  if (!name) {
    errors.name = "Subject Name is required";
  }

  if (!code) {
    errors.code = "Subject code is required";
  }

  if (!credit) {
    errors.credit = "Subject code is required";
  } else if (credit > 4 || credit < 0) {
    errors.credit = "Credits have to be between 0 to 4";
  }

  // --------sending errors
  if (Object.keys(errors).length > 0) {
    return { errors: errors };
  }

  //   ------checking if subject already exist
  const subjectExist = await subjectSchema.findOne({
    name,
    code,
  });

  if (subjectExist) {
    throw new Error("Subject already exist");
  }

  //   -----creating subject
  const newSubject = await subjectSchema.create({
    name,
    code,
    credit,
    description,
    creatorId: adminId,
  });

  return newSubject;
};

module.exports = { createSubjectServices };
