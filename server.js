const express = require('express');
const { get } = require('http');
const mongoose = require('mongoose');
const logger = require('morgan');
const dotenv = require('dotenv').config();

const { Workout } = require('./models');
const db = require('./models');

const PORT = process.env.PORT || 3000;
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
mongoose.connect(process.env.MONGODB_URI || uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});
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

app.post('/api/workouts/', (req, res) => {
  console.log('got a POST requests for /api/workouts');

});


// api call to add a workout to the database
app.put('/api/workouts/:id', ({ body }, res) => {
  // body is passed from the html form and deconstructed
  // it is json that contains the info about the exercise only
  // so we create a single workout based on the Workout model
  // and then push out body param into the exercies array that is part of the Workout Model
  const aWorkout = new db.Workout(body);
  aWorkout.exercises.push(body);

  aWorkout.save((err, data) => {
    if (err) {
      console.log(err);
    }
    res.json(data);
  });
});

app.listen(PORT, () => {
  console.log(`APP is running on port: ${PORT}!`);
});