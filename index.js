var express = require('express')
var app = express()

var port = process.env.PORT || 3001

// http://localhost:3001/
// on browser
app.get('/', (req, res) => {
  res.send('Welcome to API')
})

app.listen(port, () => {
  console.log(`server running at port ${port}`)
})
