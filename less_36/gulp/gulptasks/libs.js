const gulp =       require('gulp'),
	  conf =       require('../package.json').config,
	  cssnano =    require('gulp-cssnano'),
	  rename =     require('gulp-rename'),
	  plumber =    require('gulp-plumber'),
	  notify =     require('gulp-notify'),
      importCss =  require('gulp-import-css'),
      include =    require("gulp-include"),
      uglify =     require('gulp-uglifyes'),
      babel =      require('gulp-babel');
 
gulp.task('libs', function () {
    
gulp.src(conf.libs.css)
   .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
   .pipe(importCss())
   .pipe(cssnano())
   .pipe(rename({
    dirname: "",
    prefix: "",
    suffix:".min",
    extname: ".css"
    }))
    .pipe(gulp.dest(conf.dist.css)); 

gulp.src(conf.libs.js)
    .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
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
    .pipe(gulp.dest(conf.dist.js));
});

gulp.task('libs:watch', function () {
  gulp.watch(conf.libs.css, ['libs']);
  gulp.watch(conf.libs.js, ['libs']);
});
