const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema(
  {
    ticketId: {
      type: String,
      unique: true
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },

    subject: {
      type: String,
      required: true
    },
    p1: {
      name: { type: String }
    },
    p2: {
      name: { type: String }
    },
    thread: [
      {
        content: { type: String, trim: true },
        photo: [String],
        createdAt: { type: Date },
        name: { type: String, required: true },
        isUser: { type: Boolean, default: true }
      }
    ],
    status: { type: String, default: 'Open' }
  },
  { timestamps: true }
);

const Ticket = mongoose.model('Ticket', ticketSchema);

module.exports = Ticket;
