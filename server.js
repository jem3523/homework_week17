const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const path = require("path");

const PORT = process.env.PORT || 3000;

const db = require("./models");

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", { useNewUrlParser: true });

app.get("/exercise", (req, res) => 
{
  res.sendFile(path.join(__dirname + "/public/exercise.html"));
});

app.get("/stats", (req, res) => 
{
  res.sendFile(path.join(__dirname + "/public/stats.html"));
});


//get all workouts and return them
app.get("/api/workouts", (req, res) => 
{
  db.Workout.find({}, (error, data) => 
  {
    if (error) {res.send(error)} 
    else {res.json(data)}
  });
});

//create a new workout "shell"
app.post("/api/workouts", ({ body }, res) => {
  db.Workout.create(body)
    .then(data => {res.json(data)})
    .catch(err => {res.json(err)})
});


//update a workout with an exercise
app.put("/api/workouts/:id", (req, res) => 
{
  db.Workout.update(
    {_id: mongoose.Types.ObjectId(req.params.id)},
    {$push: {"exercises": req.body}}
  )
  .then(data => {res.json(data)})
  .catch(err => {res.json(err)})
});


//get a 7 day range
app.get("/api/workouts/range", (req, res) => 
{
  db.Workout.find({},
  (error, data) => 
  {
    if (error) {res.send(error)} 
    else {res.json(data)}
  });
});


// DELETE /api/workouts  body.id
app.delete("/api/workouts", (req, res) => 
{
  db.Workout.deleteOne(
    {_id: mongoose.Types.ObjectId(req.body.id)}
  )
  .then(data => {res.json(data)})
  .catch(err => {res.json(err)}) 
});


// Start the server
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
