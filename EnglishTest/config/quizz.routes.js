const express = require('express');
const quizzRoutes = express.Router();
let Quizz = require('../api/models/Quizz');

quizzRoutes.route('/').get((req, res) => {
    Quizz.find((error, data) => {
      if (error) {
        return next(error)
      } else {
        res.json(data)
      }
    })
});
quizzRoutes.route('/create').post((req, res) => {
  Quizz.create(req.body, (error, data) => {
    console.log(req.body);
    if (error) {
      console.log("error");
      return next(error)
    } else {
      res.json(data)
    }
  })
});
quizzRoutes.route('/read/:id').get((req, res) => {
  Quizz.findById(req.params.id, (error, data) => {
    if (error) {
     
      return next(error)
    } else {
      res.json(data)
    }
  })
});
quizzRoutes.route('/update/:id').put((req, res, next) => {
  Quizz.findByIdAndUpdate(req.params.id, {
    $set: req.body
  }, (error, data) => {
    if (error) {
      return next(error);
      console.log(error)
    } else {
      res.json(data)
      console.log('Data updated successfully')
    }
  })
});
quizzRoutes.route('/delete/:id').delete((req, res, next) => {
  Quizz.findOneAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data
      })
    }
  })
});
module.exports = quizzRoutes;