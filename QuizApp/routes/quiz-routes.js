const express = require('express')
const routerQuiz = express.Router()


const questionsModel = require('../models/question')


routerQuiz.get('/', (req, res, next) => {

    questionsModel.find({}, function (err, data) {
        console.log(data);
        if (err) {
            console.log(err)
            res.json({ err: err })
        } else {
            res.json({ questions: data })
        }
    })

})

module.exports = routerQuiz
