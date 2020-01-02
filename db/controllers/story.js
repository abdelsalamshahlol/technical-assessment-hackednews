const model = require('../models/story');

function getTopStories(limit = 10) {
    return model.getStories(limit);
}

exports.getTopStories = getTopStories;