const mongoose = require('mongoose');

const { Schema } = mongoose;

const SubPostSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    // CHANGE TO FEATURE THREE
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post'
    },
    isRating: { type: Boolean, default: false },
    replaced: Boolean,
    content: { type: String, required: true },
    photo: [String],
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
      }
    ],
    rating: Number,
    report: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Report' }],
    commentsCount: { type: Number, default: 0 }
  },
  {
    timestamps: true
  }
);

SubPostSchema.pre('validate', function (next) {
  this.commentsCount = this.comments.length;
  next();
});
const SubPost = mongoose.model('SubPost', SubPostSchema);
module.exports = SubPost;
