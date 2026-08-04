const classSchema = require("../models/classSchema");
const subjectSchema = require("../models/subjectSchema");

// -------create class services
const createClassServices = async (payload, adminId) => {
  const { name, code, description, subjectCode } = payload;

  // ----get a empty obj for all validation errors togather
  const errors = {};

  // --- validatine
  if (!name) {
    errors.name = "Name is required";
  }
  if (!code) {
    errors.code = "Class code is required";
  }

  if (!subjectCode) {
    errors.subjectCode = "Subject code is required";
  }

  // --------sending errors
  if (Object.keys(errors).length > 0) {
    return { errors: errors };
  }

  //   ------checking if class already exist
  const existClass = await classSchema.findOne({
    name,
    code,
  });

  if (existClass) {
    throw new Error("Class already exist");
  }

  //   -------checking if subject not exist
  const existSubject = await subjectSchema.findOne({ code: subjectCode });

  if (!existSubject) {
    throw new Error("Subject not exist please create a subject first");
  }

  //   --------creating class
  const newClass = await classSchema.create({
    name,
    code,
    description,
    subjects: existSubject.id,
    creatorId: adminId,
  });

  if (!newClass) {
    throw new Error("Something bad");
  }

  return newClass;
};

module.exports = { createClassServices };
