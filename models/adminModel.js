const mongoose = require('mongoose');

const { Schema } = mongoose;

const adminSchema = new Schema({
  featureName: { type: String, immutable: true, required: true },
  tagName: { type: String },
  fromAdmin: { type: Boolean },
  title: { type: String },
  content: { type: String },
  photo: [String],
  video: [String],
  status: { type: Boolean, default: true },
  condition: {
    type: String,
    enum: [
      'Expired',
      'Deleted',
      'Blocked',
      'Reposted',
      'Edited',
      'Ongoing',
      'Reported and Removed'
    ],
    default: 'Ongoing'
  },
  createdAt: { type: Date },
  expiresAt: { type: Date }
});

const Admin = mongoose.model('Admin', adminSchema);
module.exports = Admin;
