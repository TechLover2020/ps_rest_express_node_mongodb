var express = require('express')

var routes = function (Book) { // inject book model

  var bookRouter = express.Router()
  bookRouter.route('/Books')
  // use postman to post data into api
    .post((req, res) => {
      var book = new Book(req.body) // send body
      console.log(book)
      book.save() // this saves to the db
      res.status(201).send(book) // send the book and the status send back
    })
    // http://localhost:8000/api/Books/
    // http://localhost:3001/api/books/?genre=computers
    // http://localhost:3001/api/books/?author=John%20Morris
    .get((req, res) => {
      // var responseJson = {hello: "this is my api"}
      // res.json(responseJson)
      // var query = req.query // will extract the values in the query .. will filter through the db which isn't good
      var query = {}
      if (req.query.genre) {
        query.genre = req.query.genre
      }
      Book.find(query, (err, books) => {
        if (err)
          console.log(err)
        else
          res.json(books)
      })
    })

  // get an individual item
  bookRouter.route('/Books/:bookId')
  // http://localhost:3001/api/books/5a2aa16175faa5168d6c0346
    .get((req, res) => {
      Book.findById(req.params.bookId, (err, book) => {
        if (err)
          console.log(err)
        else
          res.json(book)
      })
    })
    .put((req, res) => {
      Book.findById(req.params.bookId, (err, book) => {
        if (err)
          console.log(err)
        else {
          book.title = req.body.title
          book.author = req.body.author
          book.genre = req.body.genre
          book.read = req.body.read
          book.save()
          res.json(book)
        }
      })
    })
  return bookRouter
}

module.exports = routes
