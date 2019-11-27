var mongoose = require('mongoose');

//Định nghĩa một schema
var Schema = mongoose.Schema;

var Quizz = new Schema({
    code: {
        type:String ,
        require:true,
        index: {
            unique:true
        }},
    level: {
        type:Number ,
        default: 1
    },
    content: {
        type:String ,
        require:true
    },
    answer: {
        type:String
    },
    listAnser: {
        type: JSON,
        default: [{"A":"", "B":"", "C":"", "D":""}]
    }
}, {
    collection: 'quizz'
 });
module.exports=mongoose.model('Quizz',Quizz);