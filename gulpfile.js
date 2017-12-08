var gulp = require('gulp')
var nodemon = require('gulp-nodemon')
var port = process.env.PORT || 3000

gulp.task('start', function () {
  nodemon({
    script: 'index.js'
    , ext: 'js html',
    
  })
})