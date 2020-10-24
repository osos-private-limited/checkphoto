const mongoose = require("mongoose");

const WebLoginSchema = new mongoose.Schema({
  ip: String,
  os: String,
  browser: String,
  LoginId: String,
  login: { type: Boolean, default: false },
  loggedInAt: Date,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  latitude: Number,
  longitude: Number,
});

const WebLogin = mongoose.model("WebLogin", WebLoginSchema);

module.exports = WebLogin;
