const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const visitSchema = new Schema({
  page: {
    type: String,
    required: true
  },
  method: {
    type: String,
    required: true
  },
  count: {
    type: Number,
    required: true
  }
});

module.exports = Visit = mongoose.model('visit', visitSchema);
