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

// -------get all class services
const getAllClassServices = async () => {
  const allCClass = await classSchema.find();

  if (allCClass.length == 0) {
    throw new Error("No class found");
  }

  return allCClass;
};

// -------get single class services
const getSingleClassServices = async (classId) => {
  // ----finding class
  const classData = await classSchema.findById(classId);

  if (!classData) {
    throw new Error("This class not available");
  }

  return classData;
};

module.exports = {
  createClassServices,
  getAllClassServices,
  getSingleClassServices,
};
