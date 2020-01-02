var mongoose = require('mongoose');
var request = require('request');

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
let stories = [];
getJSONFromHackerNews(topStoriesURL, function (err, data) {
  /**
   *  returned array contains IDs of each story
   *  Loop each and make a call to get the story
   *    For each story get user data
   */

  if (err) {
    return console.log(err);
  }

  let promises = getStoriesDetails(data);

  Promise.all(promises).then(result => {
    console.log({ result: result[0].by })
  });
  // console.log(data, 'data, expect to be ids for top 500 stories');
  mongoose.disconnect();
});

// Get story details 
var getStoriesDetails = function (storiesArr) {
  return storiesArr.map(storyId => {
    return new Promise((resolve, reject) => {
      request.get(`https://hacker-news.firebaseio.com/v0/item/${storyId}.json?print=pretty`,
        (err, resp, body) => {
          if (err) {
            reject(err);
          }
          // Get user info here ?? lets try
          let story = JSON.parse(body);

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
  })
}