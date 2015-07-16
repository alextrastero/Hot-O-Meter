var gulp = require('gulp'),
    gutil = require('gulp-util'),
    jade = require('gulp-jade'),
    plumber = require('gulp-plumber'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    livereload = require('gulp-livereload'),
    express = require('express');

var port = 3000,
    paths = {
        js: 'src/js/*.js',
        jade: ['src/templates/**/*.jade', '!src/templates/partials/**/*.jade'],
        dest: 'build/'
    };

// Rerun the task when a file changes
gulp.task('watch', function() {
    livereload.listen();
    gulp.watch('src/templates/**/*.jade', ['jadeTask']);
    gulp.watch(paths.js, ['jsTask']);
});

gulp.task('jadeTask', function(){
    gulp.src(paths.jade)
        .pipe(jade({pretty:'    '}))
        .pipe(gulp.dest(paths.dest))
        .pipe(livereload());
});

gulp.task('jsTask', function() {
  return gulp.src(paths.js)
    .pipe(plumber())
    // .pipe(uglify())
    .pipe(concat('main.js'))
    .pipe(gulp.dest(paths.dest + 'js/'))
    .pipe(livereload());
});

gulp.task('server', function() {
    var app = express();
    app.use(express.static(__dirname + '/build'));
    app.use('/bower_components',  express.static(__dirname + '/bower_components'));
    app.listen(port);
});

gulp.task('default', ['jsTask', 'jadeTask', 'watch', 'server']);
