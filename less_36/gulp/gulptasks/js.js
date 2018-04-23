const gulp =       require('gulp'),
	    conf =       require('../package.json').config,
	    sourcemaps = require('gulp-sourcemaps'),
	    plumber =    require('gulp-plumber'),
	    notify =     require('gulp-notify'),
      include =    require("gulp-include"),
      uglify =     require('gulp-uglifyes'),
      babel =      require('gulp-babel');
 
gulp.task('js', function () {
   return gulp.src(conf.src.js)
    .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
    .pipe(sourcemaps.init({loadmaps:true}))
    .pipe(babel({
        "presets": [
            ["env", {
             "targets": {
             "browsers": ["last 2 versions"]
            }
            }]
        ]
        }))
    .pipe(include({
       hardFail: true,
      }))
    .pipe(uglify())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(conf.dist.js));
});
 
gulp.task('js:watch', () => gulp.watch([conf.src.js, 'src/js/components/**/*.*'], ['js']));