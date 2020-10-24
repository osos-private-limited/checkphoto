const mongoose = require('mongoose');

const { Schema } = mongoose;
const n = new Date();
const year = (n.getFullYear()).toString();
const month = (n.getMonth()).toString();
const today = Number(year + month)
const reportSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    featureId: {
        type: String,
        required: true
    },
    featureName: {
        type: String,
        required: true
    },
    reason: {
        type: String,
        required: true
    },
    reportedAt: { type: Number, default: today }
});

const Report = mongoose.model('Report', reportSchema);
module.exports = Report;
