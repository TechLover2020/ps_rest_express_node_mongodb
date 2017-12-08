var express = require('express')
var mongoose = require('mongoose')
var db = mongoose.connect('mongodb://localhost/bookAPI')
var Book = require('./models/bookModel')
var app = express()

var port = process.env.PORT || 3001

var bookRouter = express.Router()

bookRouter.route('/Books')
// http://localhost:8000/api/Books/
  .get(function (req, res) {
    // var responseJson = {hello: "this is my api"}
    // res.json(responseJson)
    Book.find(function (err, books) {
      if (err)
        console.log(err)
      else
        res.json(books)
    })
  })

app.use('/api', bookRouter)

// http://localhost:3001/
// on browser
app.get('/', (req, res) => {
  res.send('Welcome to API')
})

app.listen(port, () => {
  console.log(`server running at port ${port}`)
})
