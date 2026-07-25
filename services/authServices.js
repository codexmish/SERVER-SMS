const {
  isValidateEmail,
  isValidatePassword,
  generateOTP,
} = require("../helpers/utility");
const userSchema = require("../models/userSchema");
const bcrypt = require("bcrypt");
const envConfig = require("../helpers/envConfig");

// -----signup Services
const signupServices = async (payload) => {
  const { email, name, password } = payload;

  // ----get a empty obj for all validation errors togather
  const errors = {};

  // ---name validatine
  if (!name) {
    errors.name = "Name is required";
  }

  // ---email validatine
  if (!email) {
    errors.email = "Email is required";
  } else if (!isValidateEmail(email)) {
    errors.email = "Email not valid";
  }

  // ---password validatine
  if (!password) {
    errors.password = "Password is required";
  } else if (!isValidatePassword(password)) {
    errors.password = "Password not valid";
  }

  // --------sending errors
  if (Object.keys(errors).length > 0) {
    return { errors: errors };
  }

  // ---------checking if email already exist
  const existemail = await userSchema.findOne({ email });

  if (existemail) {
    throw new Error("User already exist try another email");
  }

  // ----------password hashing
  const hashedPassword = await bcrypt.hash(
    password,
    Number(envConfig.SALT_ROUND),
  );

  //  otp generate
  const otp = generateOTP();

  // -------creating user
  const userData = await userSchema.create({
    name,
    email,
    password: hashedPassword,
    otp,
  });

  return userData;
};

module.exports = { signupServices };
