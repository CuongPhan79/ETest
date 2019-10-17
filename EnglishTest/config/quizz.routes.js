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
module.exports = quizzRoutes;