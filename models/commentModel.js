const mongoose = require('mongoose');

const { Schema } = mongoose;

const CommentSchema = new Schema({
  content: { type: String, required: true },
  createdAt: { type: Date },
  updatedAt: { type: Date, default: Date.now() },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  subpostid: { type: Schema.Types.ObjectId, ref: 'Subpost', required: true },
  report: [
    {
      date: Date,
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },
      reason: String
    }
  ]
});

CommentSchema.pre('save', function(next) {
  const date = new Date();
  this.updatedAt = date;
  if (!this.createdAt) {
    this.createdAt = date;
  }
  next();
});

const Comment = mongoose.model('Comment', CommentSchema);
module.exports = Comment;
