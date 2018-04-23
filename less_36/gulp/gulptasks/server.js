const gulp = 		require('gulp'),
      browserSync = require('browser-sync').create();
 
gulp.task('browser-sync', function() {
    browserSync.init({
        port: 3001,
        server: {
            baseDir: "dist/"
        },
    files: ['dist/**/*.*']
    });
});