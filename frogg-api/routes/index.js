var express = require('express');
var router = express.Router();

var ctrlScores = require('../controllers/scores.controllers.js');
var ctrlUsers = require('../controllers/users.controllers.js');

// Scores routes
router
  .route('/scores')
  .get(ctrlScores.scoresGetAll)
  .post(ctrlScores.scoresAddOne);

router
  .route('/scores/:scoresId')
  .get(ctrlScores.scoresGetOne);

// Authentication
router
  .route('/users/register')
  .post(ctrlUsers.register);

router
  .route('/users/login')
  .post(ctrlUsers.login);

module.exports = router;