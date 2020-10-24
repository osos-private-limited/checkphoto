const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
  encryptedId: { type: String },
  latitude: { type: String },
  longitude: { type: String },
  profilePic: { type: String },
  userId: { type: String },
  name: { type: String },
  address: { type: String }
});

const Message = mongoose.model('Message', MessageSchema);

module.exports = Message;
