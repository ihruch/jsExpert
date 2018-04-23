const gulp = require('gulp'),
	  conf = require('../package.json').config,
	  imagemin = require('gulp-imagemin');
 
gulp.task('img', function () {
    gulp.src(conf.src.img.noCompress)
        .pipe(gulp.dest(conf.dist.img));
    gulp.src(conf.src.img.compress)
        .pipe(imagemin([
            imagemin.gifsicle({interlaced: true}),
            imagemin.jpegtran({progressive: true}),
            imagemin.optipng({optimizationLevel: 5}),
            imagemin.svgo({
            plugins: [
                {removeViewBox: false},
                {cleanupIDs: false}
            ]
            })
        ]))
        .pipe(gulp.dest(conf.dist.img));
});
 
gulp.task('img:watch', () => gulp.watch('./src/img/**/*.*', ['img']));