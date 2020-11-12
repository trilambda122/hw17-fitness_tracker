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


require('./routes/api-routes')(app);

app.listen(PORT, () => {
  console.log(`APP is running on port: ${PORT}!`);
});