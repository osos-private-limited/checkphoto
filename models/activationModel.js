const mongoose = require('mongoose');

const activationSchema = new mongoose.Schema({
  uuid: { type: String },
  link: { type: String },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  createdAt: { type: Date, default: Date.now() },
  status: {
    type: String,
    enum: ['ongoing', 'responded']
  }
});

const Activation = mongoose.model('Activation', activationSchema);

module.exports = Activation;
