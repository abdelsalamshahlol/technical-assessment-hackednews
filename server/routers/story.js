var express = require('express');
var storyController = require('../../db/controllers/story.js');

var router = express.Router();

router.route('/')
  .get(function (req, res) {
    storyController.getTopStories().then(data => {
      res.json(data);
    }).catch(err => {
      res.status(500).send('Internal server error');
    });
  });

// Here we use express's route params
// Dedicated to fetch posts using USER ID
router.route('/:id')
  .get(function (req, res) {
    storyController.getUserStories(req.params.id, (err, result) => {
      if (err) {
        res.status(500).send('Internal server error');
        return;
      }
      res.json(result);
      return;
    });
  });

module.exports = router;
