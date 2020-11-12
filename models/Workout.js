const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
  day: {
    type: Date,
    default: Date.now,
  },
  // exercises: Array,
  exercises: [{
    type: {
      type: String,
      trim: true,
      required: "Enter exercise type please",
    },
    name: {
      type: String,
      trim: true,
      required: "Enter exercise name please",
    },
    duration: {
      type: Number,
      required: "Enter theduration (in minutes) of the exercise, please",
    },
    weight: { type: Number },
    distance: { type: Number },
    reps: { type: Number },
    sets: { type: Number },
  }],
});



const Workout = mongoose.model('Workout', WorkoutSchema);

module.exports = Workout;