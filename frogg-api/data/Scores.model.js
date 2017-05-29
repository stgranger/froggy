var mongoose = require('mongoose');

var ScoresSchema = new mongoose.Schema({
    username: String,
    level: Number,
    score: Number
});

mongoose.model('Score', ScoresSchema);