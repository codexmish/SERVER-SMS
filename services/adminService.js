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

module.exports = { getUserServices, approveUserServices };
