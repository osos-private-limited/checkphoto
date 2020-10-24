const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  webLanguage: { type: String, default: "en" },
  androLanguage: { type: String, default: "en" },
  jid_main: String,
  jid_anonymous: String,
  aid: String,
  name: {
    type: String,
    required: [true, "Please tell us your name!"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Please provide your email"],
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid email"],
  },
  username: {
    type: String,
    required: [true, "Please provide a username"],
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    minlength: 8,
  },
  phone: {
    type: String,
    required: [true, "Please provide your phone number"],
  },
  notifications: [
    {
      content: { type: String },
      type: {
        type: String,
        enum: ["Post", "Event", "Login", "Rating", "Ticket", "Payment"],
      },
      postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
      },
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      createdAt: { type: Date },
      featureName: { type: String },
      seen: { type: Boolean, default: false },
    },
  ],
  lastlogged_in: String,
  loggedin_from: [
    {
      location: String,
      date: Date,
    },
  ],

  registrationToken: { type: String },
  savedUsers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  ],
  reports: [
    {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Report",
        required: true,
      },
      reportedAt: { type: Number },
      reportedId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
      },
    },
  ],
  profilePic: { type: String, default: "" },
  age: String,
  DOB: Date,
  gender: {
    type: String,
  },
  resetPasswordToken: String,
  resetPasswordExpires: Date,
  passwordChangedAt: Date,
  OTP: String,
  status: { type: Boolean, default: false },
  canLogin: { type: Boolean, default: true },
  limit: { type: Number, default: 2 },
  businessAccount: { type: Boolean, default: false },
  location: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Location",
  },
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company",
  },
  bupost: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
  ],
  mybpost: [
    {
      content: { type: String },
      featureName: { type: String },
      posts: [
        {
          postId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post",
          },
        },
      ],
    },
  ],
  post: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
  ],
  subposts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubPost",
    },
  ],
  emergencyContact: [
    {
      name: { type: String },
      phone: { type: String },
    },
  ],
  danger: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  inDanger: {
    type: Boolean,
    default: false,
  },
  active: {
    type: Boolean,
    default: true,
  },
  blockedUsers: [
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      name: { type: String },
      profilePic: { type: String },
      jid_main: String,
      jid_anonymous: String,
      featureName: { type: String },
      blockedAt: { type: Date },
    },
  ],

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
      photo: [{ type: String }],
      postPhoto: { type: String },
      aid: String,
      jid: String,
      mjid: Number,
      content: String,
      requestedAt: { type: Date },
      status: { type: String, default: "pending" },
    },
  ],
  infoReportedAndDeleted: {
    type: Number,
    default: 0,
  },
  contactMe: [
    {
      type: String,
    },
  ],
  chatExitMain: [
    {
      jid: String,
      canResume: { type: Boolean, default: false },
    },
  ],
  aliasName: [
    {
      jid: { type: String },
      alias: { type: String },
      showProfile: { type: Boolean },
    },
  ],
  chatRosterMain: [
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      profilePic: String,
      name: String,
      aid: String,
      jid: String,
      chatExit: { type: Boolean, default: false },
      chatExitMe: { type: Boolean, default: false },
      canResume: { type: Boolean, default: false },
      contactMe: { type: Boolean, deafult: false },
      clearChat: { type: Number, default: -1 },
      blocked: { type: Boolean, default: false },
      blockedMe: { type: Boolean, default: false },
    },
  ],
  chatRosterAnonymous: [
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      profilePic: String,
      name: String,
      aid: String,
      jid: String,
      chatExit: { type: Boolean, default: false },
      chatExitMe: { type: Boolean, default: false },

      canResume: { type: Boolean, default: false },
      contactMe: { type: Boolean, default: false },
      clearChat: { type: Number, default: -1 },
      blocked: { type: Boolean, default: false },
      blockedMe: { type: Boolean, default: false },
    },
  ],
  clearChatMain: [
    {
      jid: String,
      clearedAt: String,
    },
  ],
  chatExitAnonymous: [
    {
      jid: String,
      canResume: { type: Boolean, default: false },
    },
  ],
  clearChatAnonymous: [
    {
      jid: String,
      clearedAt: String,
    },
  ],
  blockedMe: [
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      blockedAt: { type: Date },
    },
  ],

  webLogins: [
    {
      uid: String,
      os: { type: String, required: true },
      browser: { type: String, required: true },
      device: { type: String },
      ip: { type: String },
      latitude: { type: String },
      longitude: { type: String },
      active: {
        type: Boolean,
        default: true,
      },
    },
  ],
  activeWebLogins: [
    {
      uid: String,
      os: { type: String, required: true },
      browser: { type: String, required: true },
      device: { type: String },
      LoginId: String,
      ip: { type: String },
      latitude: { type: String },
      longitude: { type: String },
      loggedInAt: { type: Date },
      active: {
        type: Boolean,
        default: true,
      },
      token: String,
    },
  ],
  phoneToken: String,
  buser: { type: Boolean, default: false },
  organizationName: {
    type: String,
    default: "None",
  },
  certificate: {
    type: String,
  },
  email: { type: String, required: true },
  gst_certificate: { type: String },
  typeof_business: { type: String },
  verified: { type: Boolean, default: false },
  orders: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
    },
  ],
  unsafe: {
    id: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
    package: [
      {
        pid: { type: String },
        range: { type: Number },
        day: { type: Number },
        cost: { type: Number },
        expiresAt: { type: Date },
        removeAt: { type: Date },
      },
    ],
    expiresAt: { type: Date },
    freePosts: { type: Number, default: 2 },
  },
  greet: {
    id: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
    createdAt: { type: Date, default: Date.now() },
    package: [
      {
        pid: { type: String },
        range: { type: Number },
        day: { type: Number },
        expiresAt: { type: Date },
        cost: { type: Number },
        removeAt: { type: Date },
      },
    ],
    freePosts: { type: Number, default: 2 },
  },
  market: {
    categories: [
      {
        category: { type: String },
        subCategory: { type: String },
        status: { type: Boolean, default: true },
        rating: { type: Number, default: 0 },
        count: { type: Number, default: 0 },
        createdAt: { type: Date },
        expiresAt: { type: Date },
      },
    ],
    allCategories: [
      {
        category: { type: String },
        subCategory: { type: String },
      },
    ],
    id: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
    reviews: [
      {
        id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Post",
        },
        type: { type: String, enum: ["provider", "seeker"] },
        connection: { type: String },
        date: { type: Date, default: Date.now() },
      },
    ],
    rating: [
      {
        postId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Post",
        },
        uid: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        nextRemindAt: { type: Date },
        value: { type: Number, default: 0 },
        category: { type: String },
        subCategory: { type: String },
        description: { type: String },
        responseFromProvider: {
          type: String,
          default: "STG",
          enum: ["CMPT", "STG", "IGN"],
        },
        cangiveRating: { type: Boolean, default: false },
      },
    ],
    myRating: [
      {
        ratingId: String,
        id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Post",
        },
        uid: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        value: { type: Number, default: 0 },
        category: { type: String },
        subCategory: { type: String },
        responseFromSeeker: {
          type: String,
          default: "NG",
          enum: ["GIVEN", "NG", "IGN"],
        },
      },
    ],
    package: [
      {
        pid: { type: String },
        range: { type: Number },
        day: { type: Number },
        cost: { type: Number },
        expiresAt: { type: Date },
        removeAt: { type: Date },
      },
    ],

    createdAt: { type: Date, default: Date.now() },

    freePosts: { type: Number, default: 8 },
  },
  deposit: {
    id: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
    package: [
      {
        amount: { type: String },
        pid: { type: String },
        range: { type: Number },
        cost: { type: Number },
        day: { type: Number },
        expiresAt: { type: Date },
        removeAt: { type: Date },
      },
    ],
    createdAt: { type: Date, default: Date.now() },
    expiresAt: { type: Date },
    freePosts: { type: Number, default: 1 },
  },
  ambulance: {
    id: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
    createdAt: {
      type: Date,
    },
    package: [
      {
        pid: { type: String },
        range: { type: Number },
        day: { type: Number },
        cost: { type: Number },
        expiresAt: { type: Date },
        removeAt: { type: Date },
      },
    ],
    expiresAt: { type: Date, default: Date.now() + 1 * 24 * 60 * 60 * 1000 },
    freePosts: { type: Number, default: 2 },
  },
  showtime: {
    id: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
    package: [
      {
        pid: { type: String },
        range: { type: Number },
        day: { type: Number },
        cost: { type: Number },
        expiresAt: { type: Date },
        removeAt: { type: Date },
      },
    ],
    createdAt: { type: Date, default: Date.now() },
    expiresAt: { type: Date, default: Date.now() + 1 * 24 * 60 * 60 * 1000 },
    freePosts: { type: Number, default: 1 },
  },
  playtime: {
    id: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
    package: [
      {
        pid: { type: String },
        range: { type: Number },
        day: { type: Number },
        expiresAt: { type: Date },
        cost: { type: Number },
        removeAt: { type: Date },
      },
    ],
    createdAt: { type: Date, default: Date.now() },
    expiresAt: { type: Date, default: Date.now() + 1 * 24 * 60 * 60 * 1000 },
    freePosts: { type: Number, default: 1 },
  },
  people: {
    id: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
    package: [
      {
        pid: { type: String },
        range: { type: Number },
        day: { type: Number },
        expiresAt: { type: Date },
        cost: { type: Number },
        removeAt: { type: Date },
      },
    ],
    createdAt: { type: Date, default: Date.now() },
    expiresAt: { type: Date, default: Date.now() + 1 * 24 * 60 * 60 * 1000 },
    freePosts: { type: Number, default: 2 },
  },
  reportLimit: {
    type: Number,
    default: 10,
  },
  callLogs: [
    {
      aid: String,
      type: { type: String },
      status: { type: String },
      createdAt: Date,
      name: { type: String },
      profilePic: { type: String },
    },
  ],
});
userSchema.index({ "package.removeAt": 1 }, { expireAfterSeconds: 0 });
userSchema.pre("save", async function (next) {
  try {
    if (!this.isModified("password")) {
      return next();
    }
    this.password = await bcrypt.hash(this.password, 12);
    return next();
  } catch (err) {
    return resizeBy.status(400).json({ message: "invalid" });
  }
});

userSchema.pre("findOneAndUpdate", function (next) {
  this.options.runValidators = true;
  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword,
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10,
    );

    return JWTTimestamp < changedTimestamp;
  }

  // False means NOT changed
  return false;
};

userSchema.path("activeWebLogins").validate(function (loginsWeb) {
  return loginsWeb.length <= 2;
});

const User = mongoose.model("User", userSchema);

module.exports = User;
