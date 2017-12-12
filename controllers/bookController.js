var bookController = function (Book) {

  var post = function (req, res) {
    var book = new Book(req.body) // send body
    console.log(book)
    book.save() // this saves to the db
    res.status(201).send(book) // send the book and the status send back
  }

  var get = function (req, res) {
    var query = {}
    if (req.query.genre) {
      query.genre = req.query.genre
    }
    Book.find(query, (err, books) => {
      if (err)
        console.log(err)
      else {
        var returnBooks = []
        books.forEach(function (element, index, array) {
          var newBook = element.toJSON()
          newBook.links = {}
          newBook.links.self = 'http://'+req.headers.host+'/api/Books/'+ newBook._id
          returnBooks.push(newBook)
        })
        res.json(returnBooks)
      }
    })
  }

  return {
    post: post,
    get: get
  }
}

module.exports = bookController
