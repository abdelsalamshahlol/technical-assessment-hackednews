var mongoose = require('mongoose');
var request = require('request');
var Stories = require('./db/models/story.js');

mongoose.connect('mongodb://localhost/hackednews');
// In this file, build out a worker that will populate the database
// with the data you need from the HackerNews API


// Here is an example of getting the top 500 stories from the API
// and logging them to the console.
// You are not required to use this code (though you may).
var topStoriesURL = 'https://hacker-news.firebaseio.com/v0/topstories.json';

var isJSONResponse = function (headers) {
  return headers['content-type'].includes('json');
};

var getJSONFromHackerNews = function (url, callback) {
  request.get(url, function (err, response, body) {
    var data = null;
    if (err) {
      callback(err, null);
    } else if (!isJSONResponse(response.headers)) {
      callback(new Error('Response did not contain JSON data.'), null);
    } else {
      data = JSON.parse(body);
      callback(null, data);
    }
  });
};

// Promise based function that will take array of top 500 stories IDs and fetch their details and authors
// Get story details 
var getStoriesDetails = function (storiesArr) {
  return storiesArr.map(storyId => {
    return new Promise((resolve, reject) => {
      request.get(`https://hacker-news.firebaseio.com/v0/item/${storyId}.json?print=pretty`,
        (err, resp, body) => {
          if (err) {
            reject(err);
          }

          let story = JSON.parse(body);
          // Get the author information for story
          request.get(`https://hacker-news.firebaseio.com/v0/user/${story.by}.json?print=pretty`,
            (err, resp, body) => {
              if (err) {
                reject(err);
              }
              story.by = JSON.parse(body);
              resolve(story);
            });
        });
    });
  });
}

/**
 * This functions fetchs the top 500 story from HackerNews by invoking @function getStoriesDetails
 * that returns array of @type <Promise> then resolves all promises and invokes @function insertMany
 * and passes the array of 500 story to the ORM
 */
getJSONFromHackerNews(topStoriesURL, function (err, data) {
  if (err) {
    return console.log(err);
  }

  let promises = getStoriesDetails(data);

  Promise.all(promises)
    .then(stories500 => {
      // Insert data to database
      return Stories.StoryModel.insertMany(stories500);
    })
    .then(res => {
      console.log('Worker inserted data');
      mongoose.disconnect();
    }).catch(err => {
      console.error(err);
    });
});