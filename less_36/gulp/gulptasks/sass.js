const gulp = require('gulp'),
	  sass = require('gulp-sass'),
	  conf = require('../package.json').config,
	  autoprefixer = require('gulp-autoprefixer'),
	  cssnano = require('gulp-cssnano'),
	  rename = require('gulp-rename'),
	  sourcemaps = require('gulp-sourcemaps'),
	  plumber = require('gulp-plumber'),
	  notify = require('gulp-notify');
 
gulp.task('sass', function () {
   return gulp.src(conf.src.sass)
    .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.init())
    .pipe(autoprefixer({
        browsers: ['last 2 versions', 'ie 10'],
        cascade: false
        }))
    .pipe(cssnano())
    .pipe(rename({
        dirname: "",
        basename: "main",
        prefix: "",
        suffix: ".min",
        extname: ".css"
      }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(conf.dist.css));
});
 
gulp.task('sass:watch', () => gulp.watch('./src/sass/**/*.*', ['sass']));