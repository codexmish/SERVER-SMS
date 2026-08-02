const {
  isValidateEmail,
  isValidatePassword,
  generateOTP,
  generateResetPasswordToken,
  hashResetToken,
} = require("../helpers/utility");
const userSchema = require("../models/userSchema");
const bcrypt = require("bcrypt");
const envConfig = require("../helpers/envConfig");
const { mailSender } = require("../helpers/mailService");
const { OTPMailTemp } = require("../helpers/OTPmailTemplates");
const { createToken } = require("../helpers/jwt");
const {
  uploadToCloudinary,
  destroyFromCloudinary,
} = require("../helpers/cloudinaryService");
const { ResetPasswordMailTemp } = require("../helpers/ResetPassMailTemplate");

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
  await userData.save();

  // ------sending otp on email
  await mailSender({
    email,
    subject: "verify your email",
    mailTemp: OTPMailTemp(otp),
  });

  const user = await userSchema
    .findById(userData._id)
    .select("-password -otp -otpExpiry -resetToken");

  return user;
};

// -----login services
const signInServices = async (payload) => {
  const { email, password } = payload;

  // ----get a empty obj for all validation errors togather
  const errors = {};

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

  // --checking if user exist
  const existUser = await userSchema.findOne({ email }).select("+password");

  if (!existUser) {
    throw new Error("invalid credantial");
  }

  // ----checking pass
  if (!(await bcrypt.compare(password, existUser.password))) {
    throw new Error("invalid credantial");
  }

  // ----checking if used verifies
  if (!existUser.isVerified) {
    throw new Error("user not verified");
  }

  // ============jwt token part start
  const jwtPayload = {
    id: existUser.id,
    name: existUser.name,
    email: existUser.email,
    role: existUser.role,
  };

  // -------jwt acc token
  const accessToken = createToken(jwtPayload, envConfig.JWT_ACC_SEC, {
    expiresIn: "1d",
  });

  // -------jwt ref token
  const refreshToken = createToken(jwtPayload, envConfig.JWT_REF_SEC, {
    expiresIn: "7d",
  });
  // ============jwt token part end

  return { accessToken, refreshToken };
};

// ------get profile services
const getProfileServices = async (_id) => {
  // ----getting user data
  const userData = await userSchema
    .findById(_id)
    .select("-otp -otpExpiry -resetToken");

  if (!userData) {
    throw new Error("Something bad");
  }

  return userData;
};

// -----update profile Services
const updateProfileServices = async (payload, userID, avaterData) => {
  const { name, address } = payload;

  // -----checking user
  const userExist = await userSchema.findById(userID);

  // ------geting update data
  const updateData = {};

  if (name) updateData.name = name;
  if (address !== undefined) updateData.address = address;
  if (avaterData) {
    // -----uploading avater on cloudinary
    const avaterUrl = await uploadToCloudinary(avaterData);
    if (!avaterUrl) {
      throw new Error("Something went wrong");
    }
    updateData.avatar = avaterUrl;
  }

  // -----updating data if data exist for update
  if (Object.keys(updateData).length > 0) {
    const updatedUser = await userSchema.findByIdAndUpdate(userID, updateData, {
      returnDocument: "after",
      runValidators: true,
    });

    // ----destroying preveous avater ulr if user update new avater
    if (updateData.avatar) {
      await destroyFromCloudinary(userExist.avatar);
    }

    return updatedUser;
  } else {
    throw new Error("Give data for update");
  }
};

// -----reset password services
const resetPasswordServices = async (newpassword, token) => {
  if (!newpassword) {
    throw new Error("New password is required");
  } else if (!isValidatePassword(newpassword)) {
    throw new Error("Password not valid");
  }

  if (!token) {
    throw new Error("Invalid Request");
  }

  // ----hashing token
  const hashedToken = hashResetToken(token);

  const userData = await userSchema.findOne({
    resetToken: hashedToken,
    resetTokenExpiry: {
      $gt: Date.now(),
    },
  });

  if (!userData) {
    throw new Error("Invalid Request");
  }

  // ----------password hashing
  const hashedNewPassword = await bcrypt.hash(
    newpassword,
    Number(envConfig.SALT_ROUND),
  );

  // ----set New Pass
  userData.password = hashedNewPassword;
  userData.resetToken = null;
  userData.resetTokenExpiry = null;

  await userData.save();

  return;
};

// -----forget password services
const forgetPasswordServices = async (payload) => {
  const { email } = payload;

  if (!email) {
    throw new Error("email is required");
  } else if (!isValidateEmail(email)) {
    throw new Error("Email is not valid");
  }

  // --------checking if user exist
  const existUser = await userSchema.findOne({ email });

  if (!existUser) {
    throw new Error("No user found");
  }

  // ----generate reset pass token
  const { resetToken, hashedToken } = generateResetPasswordToken();

  // --set token
  existUser.resetToken = hashedToken;
  existUser.resetTokenExpiry = Date.now() + 5 * 60 * 1000;

  // ----reset pass url
  const resetPassUrl = `${envConfig.CLIENT_URL}/reset-password/${resetToken}`;
  // ------send link to email
  await mailSender({
    email,
    subject: "Reset Password",
    mailTemp: ResetPasswordMailTemp(resetPassUrl),
  });

  existUser.save();

  return;
};

//-----forget password services
const changePasswordServices = async (payload, userId) => {
  const { oldPassword, newPasswrd } = payload;
  // ----get a empty obj for all validation errors togather
  const errors = {};

  // ---Old password validatine
  if (!oldPassword) {
    errors.oldPassword = "Old Password is required";
  } else if (!isValidatePassword(oldPassword)) {
    errors.oldPassword = "Old Password not valid";
  }

  // ---New password validatine
  if (!newPasswrd) {
    errors.newPasswrd = "New Password is required";
  } else if (!isValidatePassword(newPasswrd)) {
    errors.newPasswrd = "New Password not valid";
  }

  // --------sending errors
  if (Object.keys(errors).length > 0) {
    return { errors: errors };
  }

  // ----getting user data
  const existUser = await userSchema.findById(userId).select("+password");

  if (!existUser) {
    throw new Error("Something Bad");
  }

  // ----checking pass
  if (!(await bcrypt.compare(oldPassword, existUser.password))) {
    throw new Error("invalid credantial");
  }

  // ----------New password hashing
  const hashedNewPassword = await bcrypt.hash(
    newPasswrd,
    Number(envConfig.SALT_ROUND),
  );

  existUser.password = hashedNewPassword;
  await existUser.save();

  return;
};

module.exports = {
  signupServices,
  otpVerifyServices,
  resendOtpServices,
  signInServices,
  getProfileServices,
  updateProfileServices,
  resetPasswordServices,
  forgetPasswordServices,
  changePasswordServices,
};
