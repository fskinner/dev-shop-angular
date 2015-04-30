var gulp        = require('gulp');
var jshint      = require('gulp-jshint');
var stylish     = require('jshint-stylish');
var browserSync = require('browser-sync');

var paths = {
  source: 'server/public/src/**/*.js',
  html: ['server/public/**/*.html', 'server/public/src/**.*.html']
}

gulp.task('serve', function(done) {
  browserSync({
    proxy: "localhost:3000"
  }, done);
});

function reportChange(event){
  console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
}

gulp.task('watch', ['serve'], function() {
  gulp.watch(paths.source, ['lint', browserSync.reload]).on('change', reportChange);
  gulp.watch(paths.html, browserSync.reload).on('change', reportChange);
  // gulp.watch(paths.style, browserSync.reload).on('change', reportChange);
});

gulp.task('lint', function() {
  return gulp.src(paths.source)
    .pipe(jshint())
    .pipe(jshint.reporter(stylish));
});
