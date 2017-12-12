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

  // use the middleware: will intercept rge request, go and fund bookid and it to the req, and forward it on to the route
  // only applicable only in this route
  bookRouter.use('/Books/:bookId', function (req, res, next) { // next will move to the next peice of middle ware.. in this case .. get or put
    Book.findById(req.params.bookId, (err, book) => {
      if (err) {
        console.log(err)
      }
      else if (book) {
        req.book = book // will be available in req.book
        next()
      }
      else {
        res.status(404).send('no book found')
      }
    })
  })

  // get an individual item
  bookRouter.route('/Books/:bookId')
  // http://localhost:3001/api/books/5a2aa16175faa5168d6c0346
    .get((req, res) => {
      res.json(req.book)
    })
    .put((req, res) => {
      // Book.findById(req.params.bookId, (err, book) => {
      //   if (err)
      //     console.log(err)
      //   else {
      // at this point the it req.body has the details
      req.book.title = req.body.title
      req.book.author = req.body.author
      req.book.genre = req.body.genre
      req.book.read = req.body.read
      req.book.save()
      res.json(req.book)
      //   }
      // })
    })
    .delete((req, res) => {
      // this works
     // Book.remove({'_id': req.book._id}, (err) => {
     //   if (err)
     //     res.status(404).send('no delete operation done book')
     //   else {
     //     res.status(200).send('deleted '+req.book._id)
     //   }
     // })
      req.book.remove((err) => {
        if (err) {
          res.status(500).send("can't delete "+err)
        } else {
          res.status(200).send('delete '+ req.book)
        }
      })
    })
    .patch((req, res) => {
      if (req.body._id) {
        delete req.body._id
      }
      for (var p in req.body) {
        req.body[p] = req.body[p]
      }
      req.book.save()
    })
  return bookRouter
}

module.exports = routes
