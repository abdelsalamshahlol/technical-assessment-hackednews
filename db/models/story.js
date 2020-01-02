var mongoose = require('mongoose');

// Defining the table schema
let bySchema = mongoose.Schema({
  "about": { type: String },
  "created": { type: Number },
  "id": String,
  "karma": Number,
  "submitted": [Number]
});

let storySchema = mongoose.Schema({
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

var StoryModel = mongoose.model('Story', storySchema);

// findAll retrieves all stories
function findAll(callback) {
  StoryModel.find({}, callback);
}

// findOne will retrieve the story associated with the given id
function findOne(id, callback) {
  StoryModel.find({ id: id }, callback);
}

// insertOne inserts a story into the db
function insertOne(story, callback) {
  StoryModel.create(story, callback);
}

// find top n stories
function getStories(limit) {
  return StoryModel.find({}, null, {
    limit: limit,
    sort: {
      score: -1,
    }
  });
}

exports.findOne = findOne;
exports.findAll = findAll;
exports.insertOne = insertOne;
exports.StoryModel = StoryModel;
exports.getStories = getStories;

