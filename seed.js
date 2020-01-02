var data = require('./seed_data.js');
var mongoose = require('mongoose');
var Stories = require('./db/models/story.js');
const fakeNews = require('./seed_data');

mongoose.connect('mongodb://localhost/hackednews');

var seedDb = function (data) {
  Stories.StoryModel.insertMany(data, (error, docs) => {
    if (error) {
      console.error(error);
      return;
    }

    console.log('Done');
  });
};

seedDb(fakeNews);
