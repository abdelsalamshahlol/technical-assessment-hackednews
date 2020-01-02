var data = require('./seed_data.js');
var mongoose = require('mongoose');
var Stories = require('./db/models/story.js');
const fakeNews = require('./seed_data');

mongoose.connect('mongodb://localhost/hackednews');

// Defining the table schema
let bySchema = mongoose.Schema({
  "about": { type: String },
  "created": { type: Number },
  "id": String,
  "karma": Number,
  "submitted": [Number]
});

let articleSchema = mongoose.Schema({
  "by": bySchema,
  "descendants": Number,
  "id": { type: Number, unique: true },
  "kids": [Number],
  "score": Number,
  "time": Number,
  "title": String,
  "type": String,
  "url": String,
});

let Article = mongoose.model('Article', articleSchema);

var seedDb = function (data) {
  Article.insertMany(data, (error, docs) => {
    if (error) {
      console.error(error);
      return;
    }

    console.log('Done');
  });
};

seedDb(fakeNews);
