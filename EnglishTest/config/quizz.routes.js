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
  let quizz = {}
  quizz.code = req.body.code;
  quizz.content = req.body.content;
  quizz.code = req.body.code;
  quizz.level = req.body.level;
  quizz.listAnser =  [ 
    {
        "A" : req.body.answersA,
        "B" : req.body.answersB,
        "C" : req.body.answersC,
        "D" : req.body.answersD
    }
  ]
  console.log(quizz);
  Quizz.create(quizz, (error, data) => {
  
    if (error) {
      console.log("error");
      return error
    } else {
      res.json(data)
    }
  })
});
quizzRoutes.route('/read/:id').get((req, res) => {
  Quizz.findById(req.params.id, (error, data) => {
    console.log(data);
    console.log(data.listAnser[0].A)
    if (error) {
     
      return next(error)
    } else {
      res.json(data)
    }
  })
});
quizzRoutes.route('/update/:id').put((req, res, next) => {
  let quizz = {}
  quizz.code = req.body.code;
  quizz.content = req.body.content;
  quizz.code = req.body.code;
  quizz.level = req.body.level;
  quizz.listAnser =  [ 
    {
        "A" : req.body.answersA,
        "B" : req.body.answersB,
        "C" : req.body.answersC,
        "D" : req.body.answersD
    }
  ]
  console.log(quizz);
  Quizz.findByIdAndUpdate(req.params.id, {
    $set: quizz
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
  Quizz.remove({
    _id:req.params.id
 }, function(err,data){
    if(err) return res.send(err);
    
    res.json({message:'Successfully deleted'});
  });
})
module.exports = quizzRoutes;