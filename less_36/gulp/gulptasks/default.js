const gulp = require('gulp'),
	  runSequence = require('run-sequence');

gulp.task('default', function() {
  runSequence(
  			'build',
  			[	'sass:watch',
  				'html:watch',
  				'js:watch',
  				'fonts:watch',
  				'img:watch',
  				'libs:watch'
  			],
        	'browser-sync'
            );
});