const gulp = require('gulp'),
	  conf = require('../package.json').config,
	  plumber = require('gulp-plumber'),
	  notify = require('gulp-notify'),
      fileinclude = require('gulp-file-include');
 
gulp.task('html', function () {
   return gulp.src(conf.src.html)
    .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(gulp.dest(conf.dist.html));
});
 
gulp.task('html:watch', () => gulp.watch('src/**/*.html', ['html']));