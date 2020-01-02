const model = require('../models/story');

function getTopStories(limit = 10) {
    return model.getStories(limit);
}

function getUserStories(id, callback) {
    return model.getUserPosts(id, callback);
}

exports.getTopStories = getTopStories;
exports.getUserStories = getUserStories;