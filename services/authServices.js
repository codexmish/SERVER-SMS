const {
  isValidateEmail,
  isValidatePassword,
  generateOTP,
} = require("../helpers/utility");
const userSchema = require("../models/userSchema");
const bcrypt = require("bcrypt");
const envConfig = require("../helpers/envConfig");
const { mailSender } = require("../helpers/mailService");
const { OTPMailTemp } = require("../helpers/OTPmailTemplates");

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
  const newUser = await userSchema.create({
    name,
    email,
    password: hashedPassword,
    otp,
    otpExpiry: Date.now() + 5 * 60 * 1000,
  });

  // -----geting userdata for return
  const userData = await userSchema
    .findById(newUser._id)
    .select("-password -otp -otpExpiry -resetToken");

  // ------sending otp on email
  await mailSender({
    email,
    subject: "verify your email",
    mailTemp: OTPMailTemp(otp),
  });

  return userData;
};

// -----otp-verify services
const otpVerifyServices = async (payload) => {
  const { email, otp } = payload;

  // ----get a empty obj for all validation errors togather
  const errors = {};

  // ---email validatine
  if (!email) {
    errors.email = "Email is required";
  } else if (!isValidateEmail(email)) {
    errors.email = "Email not valid";
  }

  // ---otp validation
  if (!otp) {
    errors.otp = "otp is required";
  }

  // --------sending errors
  if (Object.keys(errors).length > 0) {
    return { errors: errors };
  }

  // -------checking if user exist
  const existUser = await userSchema.findOne({ email });

  if (!existUser) {
    throw new Error("User not exist please signup");
  }

  if (existUser.otp !== otp) {
    throw new Error("Invalid credantials");
  }

  if (existUser.otpExpiry < Date.now()) {
    throw new Error("Your otp expired please try again");
  }

  // -------verifying otp and updating data
  const userData = await userSchema
    .findOneAndUpdate(
      {
        email,
        otp,
        otpExpiry: { $gt: Date.now() },
        isVerified: false,
      },
      {
        $set: {
          otp: null,
          otpExpiry: null,
          isVerified: true,
        },
      },
      {
        returnDocument: "after",
      },
    )
    .select("-password -otp -otpExpiry -resetToken");

  return userData;
};

// -----resend otp services
const resendOtpServices = async (payload) => {
  const { email } = payload;

  // ----get a empty obj for all validation errors togather
  const errors = {};

  // ---email validatine
  if (!email) {
    errors.email = "Email is required";
  } else if (!isValidateEmail(email)) {
    errors.email = "Email not valid";
  }

  // --------sending errors
  if (Object.keys(errors).length > 0) {
    return { errors: errors };
  }

  // ----finding user
  const userData = await userSchema.findOne({ email, isVerified: false });

  if (!userData) {
    throw new Error("Invalid Request");
  }

  //  otp generate
  const otp = generateOTP();

  userData.otp = otp;
  userData.otpExpiry = Date.now() + 5 * 60 * 1000;
  await userData.save()

  // ------sending otp on email
  await mailSender({
    email,
    subject: "verify your email",
    mailTemp: OTPMailTemp(otp),
  });

  const user = await userSchema.findById(userData._id).select("-password -otp -otpExpiry -resetToken");

  return user
};

module.exports = { signupServices, otpVerifyServices, resendOtpServices };
