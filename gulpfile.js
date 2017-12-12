var gulp = require('gulp')
var nodemon = require('gulp-nodemon')
var port = process.env.PORT || 8081


gulp.task('default', function () {
  nodemon({
    script: 'index.js'
    , ext: 'js html',
    env: {
      PORT: 8081
    },
    ignore: ['./node_modules/**']
  })
    .on('restart', function () {
      console.log('restarting server ... ')
    })
})
