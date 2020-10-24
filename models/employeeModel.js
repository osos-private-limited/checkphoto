const mongoose = require("mongoose");

const empSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please tell us your name!"],
  },
  email: {
    type: String,
    required: [true, "Please provide your email"],
    unique: true,
    lowercase: true,
  },
  username: {
    type: String,
    required: [true, "Please provide a username"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    minlength: 1,
  },
  phone: {
    type: String,
    required: [true, "Please provide your phone number"],
    unique: true,
  },
  profilePic: { type: String, default: "" },
  gender: {
    type: String,
    required: [true, "Please specify your gender"],
  },
  category: { type: String },
  resetPasswordToken: String,
  resetPasswordExpires: Date,
  passwordChangedAt: Date,
  role: { type: String },
  active: { type: Boolean },
  onhold: { type: Boolean, default: false },
  unauthorized: [
    {
      date: { type: Date },
      url: { type: String },
    },
  ],
});

const Employee = mongoose.model("Employee", empSchema);

module.exports = Employee;
