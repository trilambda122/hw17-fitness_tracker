const express = require('express');
const { get } = require('http');
const mongoose = require('mongoose');
const logger = require('morgan');
const dotenv = require('dotenv').config();

const { Workout } = require('./models');
const db = require('./models');

// create express instance
const app = express();

// set logger
app.use(logger('dev'));

// set public folder and urlencoding
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

const uri = process.env.ATLAS_URI;
// connect to the database
mongoose.connect(process.env.MONGODB_URI || uri, { useNewUrlParser: true });
mongoose.connection.once('open', () => {
  console.log('Connected to the Database!!');
});

// render the exercise html page
app.get('/exercise', (req, res) => {
  res.sendFile('/public/exercise.html', { root: __dirname });
});

// render the stats html page
app.get('/stats', (req, res) => {
  console.log('what is going on');
  res.sendFile('/public/stats.html', { root: __dirname });
});

// api for returning all the workout data this call is used by the stats.html page
app.get('/api/workouts/range', (req, res) => {
  db.Workout.find({})
    .then(workoutResults => {
      res.json(workoutResults);
    })
    .catch(err => {
      res.json(err);
    });
});

app.get('/api/workouts/', (req, res) => {
  db.Workout.find({})
    .then(workoutResults => {
      console.log(workoutResults);
      res.json(workoutResults);
    })
    .catch(err => {
      res.json(err);
    });
});

// api call to add a workout to the database
app.put('/api/workouts/:id', ({ body }, res) => {
  console.log("in the PUT route---->");
  console.log(body);

  const aWorkout = new db.Workout(body);

  aWorkout.exercises.push(body);

  console.log("a Workout  " + aWorkout)

  aWorkout.save((err, data) => {});


});

app.listen(3000, () => {
  console.log('App running on port 3000!');
});