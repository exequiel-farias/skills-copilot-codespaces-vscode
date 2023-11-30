// Create web server
var express = require('express');
var router = express.Router();

// Import comments model
var commentsModel = require('../models/commentsModel');

// GET /comments
router.get('/', function(req, res, next) {
  commentsModel.find(function(err, comments) {
    if (err) {
      console.log(err);
      res.render('error');
    }
    else {
      res.json(comments);
    }
  });
});

// POST /comments
router.post('/', function(req, res, next) {
  commentsModel.create({
    name: req.body.name,
    comment: req.body.comment
  }, function(err, comments) {
    if (err) {
      console.log(err);
      res.render('error');
    }
    else {
      res.json(comments);
    }
  });
});

// DELETE /comments
router.delete('/:id', function(req, res, next) {
  commentsModel.remove({
    _id: req.params.id
  }, function(err, comments) {
    if (err) {
      console.log(err);
      res.render('error');
    }
    else {
      res.json(comments);
    }
  });
});

// PUT /comments
router.put('/:id', function(req, res, next) {
  commentsModel.findById(req.params.id, function(err, comments) {
    if (err) {
      console.log(err);
      res.render('error');
    }
    else {
      comments.name = req.body.name;
      comments.comment = req.body.comment;

      comments.save(function(err, comments) {
        if (err) {
          console.log(err);
          res.render('error');
        }
        else {
          res.json(comments);
        }
      });
    }
  });
});

module.exports = router;
