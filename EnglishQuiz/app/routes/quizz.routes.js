const express = require('express');
const quizzRoutes = express.Router();
let question = require('../models/question');

quizzRoutes.route('/').get((req, res) => {
  question.find((error, data) => {
      if (error) {
        return next(error)
      } else {
        res.json(data);
      }
    })
});
quizzRoutes.route('/create').post((req, res) => {
  var questionObj = {}
  questionObj.code = req.body.code
  questionObj.question = req.body.question;
  var options = [];
  options.push(req.body.optionA);
  options.push(req.body.optionB);
  options.push(req.body.optionC);
  options.push(req.body.optionD);
  questionObj.options = options;
  questionObj.answer = req.body.answer;
  console.log(questionObj);
  question.create(questionObj, (error, data) => {
  
    if (error) {
      console.log("error");
      return error
    } else {
      res.json(data)
    }
  })
});
quizzRoutes.route('/read/:id').get((req, res) => {
  question.findById(req.params.id, (error, data) => {
    console.log(data);
    console.log(data.options[0])
    if (error) {
     
      return next(error)
    } else {
      res.json(data)
    }
  })
});
quizzRoutes.route('/update/:id').put((req, res, next) => {
  var questionObj = {}
  questionObj.code = req.body.code
  questionObj.question = req.body.question;
  var options = [];
  options.push(req.body.optionA);
  options.push(req.body.optionB);
  options.push(req.body.optionC);
  options.push(req.body.optionD);
  questionObj.options = options;
  questionObj.answer = req.body.answer;
  question.findByIdAndUpdate(req.params.id, {
    $set: questionObj
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
quizzRoutes.route('/delete/:id').patch((req, res, next) => {
  console.log(req.params)
  question.remove({
    _id:req.params.id
 }, function(err,data){
    if(err) return res.send(err);
    
    res.json({message:'Successfully deleted'});
  });
})
module.exports = quizzRoutes;