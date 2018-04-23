const gulp = 		require('gulp'),
	  runSequence = require('run-sequence'),
	  del = 		require('del');

gulp.task('clear', () => del(['dist']));

gulp.task('build', ['clear'], function() {
  runSequence(
              'sass',
              'html',
              'js',
              'fonts',
              'img:watch',
              'libs'
            );
});