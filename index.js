var express = require('express')
var mongoose = require('mongoose')
var db = mongoose.connect('mongodb://localhost/bookAPI') // open a connecction to db
var Book = require('./models/bookModel') // mongoose gets data out of mongodb via model

var app = express()
var bodyParser = require('body-parser') // read body and parse into json object

var port = process.env.PORT || 8081

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
bookRouter =require('./Routes/bookRoutes')(Book)

app.use('/api', bookRouter)

// http://localhost:8081/
// on browser
app.get('/', (req, res) => {
  res.send('Welcome to API')
})

app.listen(port, () => {
  console.log(`server running at port ${port}`)
})
