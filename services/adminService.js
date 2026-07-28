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

module.exports = { getUserServices };
