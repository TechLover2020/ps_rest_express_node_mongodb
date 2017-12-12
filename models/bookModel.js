// bookmodel is basically a json object which lays out what a book looks like
var mongoose = require('mongoose') // reference to mongoose
var Schema = mongoose.Schema

var bookModel = new Schema({
  title: {type: String},
  author: {type: String},
  genre: {type: String},
  read: {type: Boolean, default: false}
})

module.exports = mongoose.model('Book', bookModel) // new schema called Book, require this bookmodel we have an instance of Book
