const mongoose = require("mongoose");
const { Schema } = mongoose;

const ChangeSchema = new mongoose.Schema({
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
  },

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  originalPhoto: [{ type: String }],
  type: String,
  replacedPhotos: [{ type: String }],
  duplicatePhotos: [{ type: Object }],
  replacedPhoto: { type: String },
  video: [],

  originalVideo: [{ type: String }],
  dupDeleted: { type: Boolean },
  status: {
    type: String,
    enum: ["ongoing", "replaced", "unchanged", "replaced&checked"],
  },
});

const Replace = mongoose.model("Replace", ChangeSchema);

module.exports = Replace;
