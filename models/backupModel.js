const mongoose = require("mongoose");
const { Schema } = mongoose;

const backupSchema = new mongoose.Schema({
  name: String,
  skip: Number,
});

const Backup = mongoose.model("Backup", backupSchema);

module.exports = Backup;
