const gulp = require('gulp'),
	  conf = require('../package.json').config;
     
   gulp.task('fonts', function () {
   return gulp.src(conf.src.fonts)
    .pipe(gulp.dest(conf.dist.fonts));
});
 
gulp.task('fonts:watch', () => gulp.watch(conf.dist.fonts, ['fonts']));