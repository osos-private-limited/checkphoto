const mongoose = require('mongoose');

const deletedUserSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String },
  phone: { type: String },
  username: { type: String },
  jid_main: { type: String },
  jid_anonymous: { type: String },
  aid: { type: String },
  deletedAt: { type: Date },
  rejoinAt: { type: Date },
  reasons: [{ type: String }],
  description: { type: String },
  rejoined: { type: Boolean },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  deleted_type: { type: String }
});

const DeletedUser = mongoose.model('DeletedUser', deletedUserSchema);
module.exports = DeletedUser;
