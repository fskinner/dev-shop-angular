var gulp        = require('gulp');
var jshint      = require('gulp-jshint');
var stylish     = require('jshint-stylish');
var browserSync = require('browser-sync');
var karma       = require('gulp-karma');

var paths = {
  source: 'client/src/**/*.js',
  test: 'client/test/*.spec.js',
  html: ['client/**/*.html', 'client/src/**.*.html'],
  server: 'api/**/*.js'
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
});

gulp.task('lint', function() {
  return gulp.src(paths.source)
    .pipe(jshint())
    .pipe(jshint.reporter(stylish));
});

gulp.task('lint-server', function() {
  return gulp.src(paths.server)
    .pipe(jshint())
    .pipe(jshint.reporter(stylish));
});

gulp.task('test', function() {
  return gulp.src('./foo')
    .pipe(karma({
      configFile: 'client/karma.conf.js',
      action: 'run'
    }));
});
