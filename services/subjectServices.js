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

// -------get subject
const getSubjectServices = async () => {
  const subjectList = await subjectSchema.find();

  if (subjectList.length == 0) {
    throw new Error("No subject found");
  }
  return subjectList;
};

// ------delete subject
const deleteSubjectServices = async (subjectId) => {
  // ------check if subject not exist
  const existSubject = await subjectSchema.findById(subjectId);

  if (!existSubject) {
    throw new Error("Subject not found");
  }

  // ------deleting subject
  await subjectSchema.findByIdAndDelete(existSubject.id);
  return;
};

// ------update subject
const updateSubjectServices = async (payload, subjectId) => {
  const { name, code, credit, description } = payload;

  // ------check if subject not exist
  const existSubject = await subjectSchema.findById(subjectId);

  if (!existSubject) {
    throw new Error("Subject not found");
  }

  // ------geting update data
  const updateData = {};

  if (name) updateData.name = name;
  if (code) updateData.code = code;
  if (credit) updateData.credit = credit;
  if (description) updateData.description = description;

  // -----updating data if data exist for update
  if (Object.keys(updateData).length > 0) {
    const updatedUser = await subjectSchema.findByIdAndUpdate(
      subjectId,
      updateData,
      {
        returnDocument: "after",
        runValidators: true,
      },
    );

    return updatedUser;
  } else {
    throw new Error("Give data for update");
  }
};

// ------get single subject
const getSingleSubjectServices = async (SubjectId) => {
  // -----checking single subject
  const subject = await subjectSchema.findById(SubjectId);

  if (!subject) {
    throw new Error("No subject found");
  }
  console.log(subject);
  

  return subject;
};

module.exports = {
  createSubjectServices,
  getSubjectServices,
  deleteSubjectServices,
  updateSubjectServices,
  getSingleSubjectServices,
};
