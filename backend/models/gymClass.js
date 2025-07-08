const mongoose = require('mongoose');

const GymClassSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    default: '',
  },
  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Assuming there is a User schema
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  schedule: {
    date: {
      type: Date,
      required: true,
    },
    startTime: {
      type: String, // Example: "18:00"
      required: true,
    },
    endTime: {
      type: String, // Example: "19:00"
      required: true,
    }
  },
  capacity: {
    type: Number,
    required: true,
    min: 1
  },
  enrolledUsers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  difficulty: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Advanced'],
    default: 'Beginner'
  },
  isCancelled: {
    type: Boolean,
    default: false
  },
  gym: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "Gym",
  required: true
},

  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('GymClass', GymClassSchema);
