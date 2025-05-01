const express = require('express');
const router = express.Router();
const Progress = require('../models/Progress');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/save', authMiddleware, async (req, res) => {
  const { topicId, problemId, checked } = req.body;
  try {
    const filter = { userId: req.user.userId, topicId };
    const update = { $set: { [`problems.${problemId}`]: checked } };
    
    console.log("Filter:", filter);
    console.log("Update:", update);

    const progress = await Progress.findOneAndUpdate(filter, update, { upsert: true, new: true });
    
    res.send({ success: true, progress }); // Optionally return the updated progress
  } catch (err) {
    console.error("Error saving progress:", err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/:topicId', authMiddleware, async (req, res) => {
  try {
    const progress = await Progress.findOne({ userId: req.user.userId, topicId: req.params.topicId });
    res.send(progress?.problems || {});
  } catch (err) {
    console.error("Error fetching progress:", err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
