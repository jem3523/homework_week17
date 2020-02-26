const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
  day: {
    type: Date, default: Date.now,
    unique: true
  },
  totalDuration: Number, default: 0,
  exercises: []
});

WorkoutSchema.methods.addDurationTotal = function() 
{
  console.log("start duration total method on client")
  let total = 0;
  for (let i=0; i<this.exercises.length; i++)
  {
    total += this.exercises[i].duration;
  }
  this.totalDuration = total;
  return total;
};

const Workout = mongoose.model("workout", WorkoutSchema);

module.exports = Workout;
