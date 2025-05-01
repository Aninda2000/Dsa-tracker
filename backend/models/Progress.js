const mongoose = require('mongoose');

const progressSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true },
  topicId: { type: String, required: true },
  problems: {
    type: Map,
    of: Boolean,
    default: {}
  }
});

module.exports = mongoose.model('Progress', progressSchema);
