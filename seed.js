var data = require('./seed_data.js');
var mongoose = require('mongoose');
var Stories = require('./db/models/story.js');
const fakeNews = require('./seed_data');

mongoose.connect('mongodb://localhost/hackednews');

// Defining the table schema
let bySchema = new mongoose.schema({
  "about": { type: String },
  "created": { type: Number },
  "id": String,
  "karma": Number,
  "submitted": [Number]
});

let articleSchema = new mongoose.schema({
  "by": bySchema,
  "descendants": Number,
  "id": Number,
  "kids": [Number],
  "score": Number,
  "time": Number,
  "title": String,
  "type": String,
  "url": String,
});

var seedDb = function (data) {
  // your code here!
  data.forEach((article, i) => {
    const news = new mongoose.model('news')
  });
};

seedDb(data);
