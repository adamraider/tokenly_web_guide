var gulp = require('gulp'),
    util = require('gulp-util'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    plumber = require('gulp-plumber'),
    autoprefixer = require('gulp-autoprefixer'),
    browserSync = require('browser-sync').create(),
    reload = browserSync.reload,
    watch = require('gulp-watch');

var errorHandler = function (error) {
  console.log(error.message);
  this.emit("end");
}

gulp.task('default', ['styles']);

gulp.task('styles', function() {
  return gulp.src('./src/sass/**/**.sass')
    .pipe(plumber({ errorHandler: errorHandler }))
    .pipe(sass({ indentedSyntax: true }).on('error', util.log))
    .pipe(concat('application.css'))
    .pipe(gulp.dest('./css'))
    .pipe(browserSync.reload({ stream:true }))
});

gulp.task('serve', function() {
  browserSync.init({
    server: {
      baseDir: "./"
    }
  });
  watch('./src/sass/**/*.sass', function(){ gulp.start('styles'); })
});