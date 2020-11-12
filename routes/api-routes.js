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
  // api call to add a exercise to an existing workout
  app.put('/api/workouts/:id', async(req, res) => {
    const aWorkout = await db.Workout.findById(req.params.id).exec();
    aWorkout.exercises.push(req.body);
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