const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  mobile: { type: String, required: true, unique: true },
  room: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
