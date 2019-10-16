var mongoose = require('mongoose');

//Định nghĩa một schema
var Schema = mongoose.Schema;

var QuizzSchema = new Schema({
    code: {
        type:String ,
        require:true,
        index: {
            unique:true
        }},
    level: {
        type:Number ,
        require:true,
        isIn: [1, 2, 3, 4, 5],
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
});
module.exports=mongoose.model('quizz',QuizzSchema);