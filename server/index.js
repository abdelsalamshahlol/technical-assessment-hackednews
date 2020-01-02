var express = require('express');
var bodyParser = require('body-parser');
var storyRouter = require('./routers/story.js');
var mongoose = require('mongoose');

var app = express();

mongoose.connect('mongodb://localhost/hackednews');

app.use(bodyParser.json());

// UNCOMMENT FOR REACT
app.use(express.static(__dirname + '/../react-client/dist'));

// UNCOMMENT FOR ANGULAR
// app.use(express.static(__dirname + '/../angular-client'));
// app.use(express.static(__dirname + '/../node_modules'));

app.use('/api/story', storyRouter);

app.listen(8000, function () {
  console.log('listening on port 8000');
});
