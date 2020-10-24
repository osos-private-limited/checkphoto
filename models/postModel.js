const mongoose = require("mongoose");

const { Schema } = mongoose;

const PostSchema = new Schema(
  {
    jid_main: String,
    jid_anonymous: String,
    replaced: Boolean,
    featureName: { type: String, immutable: true, required: true },
    title: { type: String },
    content: { type: String },
    photo: [String],
    video: [String],
    mediaDeleted: { type: Boolean, default: false },
    radius: { type: Number, required: true },
    subposts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "SubPost",
      },
    ],
    status: { type: Boolean, default: true },
    condition: {
      type: String,
      enum: [
        "Expired",
        "Deleted",
        "Blocked",
        "Reposted",
        "Edited",
        "Ongoing",
        "Reported and Removed",
      ],
      default: "Ongoing",
    },
    createdAt: { type: Date, default: Date.now() },
    repost: [
      {
        time: { type: Date },
      },
    ],
    expiresAt: { type: Date },
    greetRequest: [
      {
        uservisibility: {
          name: { type: String, default: "Anonymous" },
          profilePic: {
            type: String,
            default:
              "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Anonymous.svg/1200px-Anonymous.svg.png",
          },

          gender: { type: String, default: "Not specified" },
        },
        postId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Post",
        },
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        photo: [String],
        aid: String,
        jid: String,
        mjid: Number,
        content: String,
        status: { type: String },
      },
    ],
    category: { type: String },
    subCategory: { type: String },
    isProvider: { type: Boolean },
    uservisibility: {
      name: { type: String, default: "Anonymous" },
      profilePic: {
        type: String,
        default:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Anonymous.svg/1200px-Anonymous.svg.png",
      },
      chat: { type: Boolean, default: true },
      phoneCall: { type: Boolean, default: true },
      location: { type: Boolean, default: true },
      gender: { type: String, default: "Not specified" },
      share: { type: String, default: "false" },
      email: { type: String, default: "false" },
    },
    dynamicLocation: { type: Boolean },
    showLocation: { type: Boolean },
    jid: { type: String, default: "" },
    aid: { type: String, default: "" },
    options: {
      id: { type: Number, enum: [0, 1, 2, 3, 4, 5] },
      title: {
        type: String,
      },
    },
    actions: [
      {
        id: { type: Number, enum: [0, 1, 2, 3] },
        title: {
          type: String,
          required: [true, "Actions title cannot be empty"],
        },
        visible: {
          type: Boolean,
          required: [true, "Actions Visibility cannot be empty"],
        },
      },
    ],
    SOS: { type: Boolean, default: false },
    report: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Report",
        required: [true, "Report ID must reference to a valid report"],
      },
    ],
    repost: [{ createdAt: { type: Date } }],
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Post must belong to a user."],
    },
    repostDescription: [
      {
        description: String,
        postedAt: Date,
      },
    ],
    locationDynamic: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Location",
    },
    locationStatic: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
      },
      coordinates: {
        type: [Number],
      },
    },
    locationName: { type: String },
    depositOption: { type: String },
    depositCategory: { type: String },
  },
  {
    timestamps: true,
  },
);
PostSchema.index({ locationStatic: "2dsphere" });
PostSchema.pre("save", async function (next) {
  try {
    if (this.report.length === 10) {
      this.status = false;
      this.condition = "Reported and Removed";
      return next();
    }
  } catch (error) {
    return next(error);
  }
});

const Post = mongoose.model("Post", PostSchema);
module.exports = Post;
