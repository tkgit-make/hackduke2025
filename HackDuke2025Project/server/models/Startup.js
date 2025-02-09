const mongoose = require('mongoose');

const startupSchema = new mongoose.Schema({
  name: { type: String, required: true },
  industry: { type: String, required: true },
  shortDescription: String,
  fundingGoal: Number,
  fundingRaised: Number,
  equity: Number,
  location: String,
  stage: String,
  posts: [{
    content: String,
    image: String,
    timestamp: Date,
    likes: Number
  }]
});

module.exports = mongoose.model('Startup', startupSchema); 