const userSchema = require("../models/userSchema");

// -----get all users Services
const getUserServices = async () => {
  const allUsers = await userSchema.find({
    role: ["TEACHER", "STUDENT"],
  });

  if (!allUsers) {
    throw new Error("No User Found");
  }

  return allUsers;
};

// -----approve user services
const approveUserServices = async (id) => {
  const approveUser = await userSchema.findByIdAndUpdate(
    id,
    { isApproves: true },
    { returnDocument: "after", runValidators: true },
  );

  return approveUser;
};

// -----delete user services
const deleteUserService = async (id) => {
  const deleteUser = await userSchema.findByIdAndDelete(id);

  return deleteUser;
};

// -----get pending users services
const getPendingUsersServices = async () => {
  const pendingUsers = await userSchema.find({
    role: {
      $in: ["TEACHER", "STUDENT"],
    },
    isApproves: false,
  });

  if (!pendingUsers || pendingUsers.length === 0) {
    throw new Error("No pending users found");
  }

  return pendingUsers;
};

// ------get all approved user services
const getAllApprovedUserServices = async () => {
  const approvesUsers = await userSchema.find({
    isApproves: true,
  });

  if (!approvesUsers || approvesUsers.length === 0) {
    throw new Error("No approved users found");
  }

  return approvesUsers;
};

// ------get all student services
const getAllStudentsServices = async () => {
  const allStudents = await userSchema.find({
    role: "STUDENT",
    isApproves: true,
  });

  if (!allStudents || allStudents.length === 0) {
    throw new Error("No student data found");
  }

  return allStudents;
};

// ------get all Teacher services
const getAllTeacherServices = async () => {
  const allTeacher = await userSchema.find({
    role: "TEACHER",
    isApproves: true,
  });

  if (!allTeacher || allTeacher.length === 0) {
    throw new Error("No teacher data found");
  }

  return allTeacher;
};

module.exports = {
  getUserServices,
  approveUserServices,
  deleteUserService,
  getPendingUsersServices,
  getAllApprovedUserServices,
  getAllStudentsServices,
  getAllTeacherServices,
};
