var mongoose = require('mongoose');
var Score = mongoose.model('Score');


module.exports.scoresGetAll = function(req, res) {

  console.log('GET the scores');
  console.log(req.query);

  var offset = 0;
  var count = 10;

  if (req.query && req.query.offset) {
    offset = parseInt(req.query.offset, 10);
  }

  if (req.query && req.query.count) {
    count = parseInt(req.query.count, 10);
  }

  if (isNaN(offset) || isNaN(count)) {
    res
      .status(400)
      .json({
        "message" : "If supplied in querystring, count and offset must both be numbers"
      });
    return;
  }

  Score
    .find()
    .skip(offset)
    .limit(count)
    .exec(function(err, scores) {
      if (err) {
        console.log("Error finding scores");
        console.log(err);
        res
          .status(500)
          .json(err);
      } else {
        console.log("Found scores", scores.length);
        res
          .json(scores);
      }
    });

};

module.exports.scoresGetOne = function(req, res) {
  var id = req.params.scoresId;

  console.log('GET scoresId', id);

  Score
    .findById(id)
    .exec(function(err, document) {
      var response = {
        status : 200,
        message : document
      };
      if (err) {
        console.log("Error finding scores");
        response.status = 500;
        response.message = err;
      } else if(!document) {
        console.log("scoresId not found in database", id);
        response.status = 404;
        response.message = {
          "message" : "scores ID not found " + id
        };
      }
      res
        .status(response.status)
        .json(response.message);
    });
};


module.exports.scoresAddOne = function(req, res) {
  console.log("POST new score");

  Score
    .create({
      username : req.body.username,
      level: req.body.level,
      score: req.body.score
    }, function(err, score) {
      if (err) {
        console.log("Error creating score");
        res
          .status(400)
          .json(err);
      } else {
        console.log("score created!", score);
        res
          .status(201)
          .json(score);
      }
    });
};
