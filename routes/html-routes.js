let db = require('../models');

module.exports = function(app) {
  // render the exercise html page
  app.get('/exercise', (req, res) => {
    res.sendFile('/public/exercise.html', { root: __dirname });
  });

  // render the stats html page
  app.get('/stats', (req, res) => {
    console.log('what is going on');
    res.sendFile('/public/stats.html', { root: __dirname });
  });
}