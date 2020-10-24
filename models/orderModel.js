const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  orderId: { type: String },
  notes: { type: Object },
  rzOrderId: { type: String },
  rzpaymentId: { type: String },
  featureName: { type: String },
  duration: { type: String },
  status: { type: String },
  attempts: { type: String },
  radius: { type: String },
  amount: { type: String },
  packageId: { type: String },
  refundedAt: { type: Date },
  createdAt: { type: Date, default: Date.now() }
});

OrderSchema.index({ location: '2dsphere' });
const Order = mongoose.model('Order', OrderSchema);

module.exports = Order;
