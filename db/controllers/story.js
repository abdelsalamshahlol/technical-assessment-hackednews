const model = require('../models/story');

function getTopStories() {
    return model.getStories(10);
}

exports.getTopStories = getTopStories;