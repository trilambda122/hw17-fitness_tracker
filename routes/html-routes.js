const path = require("path");
const db = require('../models');

module.exports = function(app) {
  // render the exercise html page
  app.get('/exercise', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/exercise.html'));
  });

  // render the stats html page
  app.get('/stats', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/stats.html'));
  });
};