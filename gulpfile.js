"use strict";


var gulp = require('gulp');
var server = require('gulp-server-livereload');
var sass = require('gulp-sass');
var prefix = require('gulp-autoprefixer');
var useref = require('gulp-useref');
var gulpif = require('gulp-if');
var uglify = require('gulp-uglify');
var minifyCss = require('gulp-csso');
var deploy = require('gulp-gh-pages');


/** server */
gulp.task('start', function () {
    gulp.src('dist')
        .pipe(server({
            livereload: true,
            open: true
        }))
});

/** sass */
gulp.task('style', function () {
    return gulp.src('app/sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(prefix({
            browsers: ['last 15 versions']
        }))
        .pipe(gulp.dest('app/css'))
});

/** watch */
gulp.task('watch', function () {
    gulp.watch('app/sass/**/*.scss', ['style'])
});

/** default */
gulp.task('default', ['start', 'watch']);

/** build */
gulp.task('build', function () {
    return gulp.src('app/*.html')
        .pipe(useref())
        .pipe(gulpif('*.js', uglify()))
        .pipe(gulpif('*.css', minifyCss()))
        .pipe(gulp.dest('dist'))
});

/** deploy to GitHub pages */
gulp.task('deploy', function () {
    gulp.src("./dist/**/*.*")
        .pipe(deploy());
});


