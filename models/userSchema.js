const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    avatar: {
      type: String,
      default: "",
    },
    address: {
      type: String,
      default: "",
    },
    otp: {
      type: String,
      default: null,
    },
    otpExpiry: {
      type: Date,
    },
    resetToken: {
      type: String,
      default: null,
    },
    resetTokenExpiry: {
      type: Date,
    },
    role: {
      type: String,
      require: true,
      default: "user",
      enum: ["user", "moderator", "admin"],
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("user", userSchema);
