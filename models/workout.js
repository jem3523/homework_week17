const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
  day: {
    type: Date, default: Date.now,
    unique: true
  },
  exercises: []
});


const Workout = mongoose.model("workout", WorkoutSchema);

module.exports = Workout;
