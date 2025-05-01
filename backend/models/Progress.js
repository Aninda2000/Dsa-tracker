// models/Progress.js
const mongoose = require('mongoose');

const progressSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true },
  topicId: { type: String, required: true },
  problems: {
    type: Map,
    of: Boolean, // true or false based on whether the problem is checked
    default: {}
  }
});

module.exports = mongoose.model('Progress', progressSchema);
