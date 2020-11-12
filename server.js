const express = require('express');
// const { get } = require('http');
const mongoose = require('mongoose');
const logger = require('morgan');
const dotenv = require('dotenv').config();

const { Workout } = require('./models');
// const db = require('./models');

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

require('./routes/api-routes')(app);
require('./routes/html-routes')(app);

app.listen(PORT, () => {
  console.log(`APP is running on port: ${PORT}!`);
});