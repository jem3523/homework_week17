const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
  day: {
    type: Date, default: Date.now,
    unique: true
  },
  totalDuration: Number,
  exercises: []
});

WorkoutSchema.methods.addDurationTotal = function() 
{
  let total = 0;
  for (let i=0; i<this.exercises.length; i++)
  {
    total += this.exercises[i].duration;
  }
  this.totalDuration = total;
  return this.totalDuration
};


const Workout = mongoose.model("workout", WorkoutSchema);

module.exports = Workout;
