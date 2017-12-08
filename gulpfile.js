var gulp = require('gulp')
var nodemon = require('gulp-nodemon')
var port = process.env.PORT || 3000

gulp.task('default', function () {
  nodemon({
    script: 'index.js'
    , ext: 'js html',
    env: {
      PORT: 8000
    },
    ignore: ['./node_modules/**']
  })
})