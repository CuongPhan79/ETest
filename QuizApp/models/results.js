const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ResultSchema = new Schema({
    name: String,
    score: Number,
    date: Date
})

const Result = module.exports = mongoose.model('Result', ResultSchema)

module.exports.getResultsByName = function (name, callback) {
    const query = { name: name }
    Result.find(query, callback)
}
module.exports.registerResult = function (newResult, callback) {
    newResult.save(callback)
}
