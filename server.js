const express = require('express');
const { get } = require('http');
const mongoose = require('mongoose');
const logger = require('morgan');
const path = require('path');
const db = require('./models');

// create express instance
const app = express();

// set logger
app.use(logger('dev'));

// set public folder and urlencoding
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// connect to the database
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/workout', { useNewUrlParser: true });

// const work = db.Workout.find().then(results => { console.log(results) });

// render the exercise html page
app.get('/exercise', (req, res) => {
  console.log('what is going on');
  res.sendFile('/public/exercise.html', { root: __dirname });
});

// redner the stats html page
app.get('/stats', (req, res) => {
  console.log('what is going on');
  res.sendFile('/public/stats.html', { root: __dirname });
});

// api for returning all the workout data
app.get('/api/workouts/range', (req, res) => {
  db.Workout.find({})
    .then(workoutResults => {
      res.json(workoutResults);
    })
    .catch(err => {
      res.json(err);
    });
});


app.listen(3000, () => {
  console.log('App running on port 3000!');
});