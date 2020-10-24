const mongoose = require('mongoose');

const SplashSchema = new mongoose.Schema({
  image: { type: String },
  title: { type: String },
  description: { type: String }
});
const Apptour = mongoose.model('Splashscreen', SplashSchema);
module.exports = Apptour;
