var mongoose = require('mongoose');
var dbUrl = 'mongodb://localhost/frogg';


mongoose.connect(dbUrl);

mongoose.connection.on('connected', function(){
    console.log('Mongoose connected on ' + dbUrl);
});

mongoose.connection.on('disconnected', function(){
    console.log('Mongoose disconnected');
});

mongoose.connection.on('error', function(err){
    console.log('Mongoose connected error: ' + err);
});

process.on('SIGINT', function(){
    mongoose.connection.close(function(){
        console.log('Mongoose disconnected by app termination SIGINT');
        process.exit(0);
    });
});

process.on('SIGTERM', function(){
    mongoose.connection.close(function(){
        console.log('Mongoose disconnected by app termination SIGTERM');
        process.exit(0);
    });
});

process.once('SIGUSR2', function(){
    mongoose.connection.close(function(){
        console.log('Mongoose disconnected by app termination SIGUSR2');
        process.kill(process.pid, 'SIGUSR2');
    });
});

// BRING SCHEMAS AND MODELS

require('./Scores.model.js');
require('./Users.model.js');