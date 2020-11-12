let db = require('../models');

module.exports = function(app) {
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
        res.json(workoutResults);
      })
      .catch(err => {
        res.json(err);
      });
  });

  app.get('/api/exercise/:id', (req, res) => {
    console.log('<----IN THE API/EXERCSISE/ID GET---->');
    console.log(req.params.id);
    db.Workout.findById(req.params.id)
      .then(workoutResults => {
        console.log('<------->');
        console.log(workoutResults);
        res.json(workoutResults);
      })
      .catch(err => {
        res.json(err);
      });
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

  app.post('/api/workouts/', (req, res) => {
    console.log('got a POST requests for /api/workouts');
    // console.log(req);
    db.Workout.create({})
      .then((newWorkout) => {
        res.json(newWorkout);
      })
      .catch((err) => res.json(err));
  });
};