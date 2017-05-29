require('./frogg-api/data/dbconnection.js');
var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var routes = require('./frogg-api/routes');

// Define the port to run on
app.set('port', 4200);

// Add middleware to console log every request
app.use(function(req, res, next) {
  console.log(req.method, req.url);
  next();
});

// Set static directory before defining routes
app.use(express.static(path.join(__dirname, 'public')));
app.use('/node_modules', express.static(__dirname + '/node_modules'));

// Enable parsing of posted forms
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Add some routing
app.use('/', routes);

// listen for requests
var server = app.listen(app.get('port'), function () {

    let host = server.address().address;
    let port = server.address().port;
    console.log("The server run on port: " + port);
    console.log(`http://${host}:${port}`);    
});