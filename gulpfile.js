var gulp = require('gulp'),
    gutil = require('gulp-util'),
    jade = require('gulp-jade'),
    livereload = require('gulp-livereload'),
    express = require('express');

var port = 3000,
    paths = {
        jade: ['src/templates/**/*.jade', '!src/templates/partials/**/*.jade'],
        dest: 'build/'
    };

// Rerun the task when a file changes
gulp.task('watch', function() {
    livereload.listen();
    gulp.watch(paths.jade, ['jadeTask']);
});

gulp.task('jadeTask', function(){
    gulp.src(paths.jade)
        .pipe(jade({pretty:'    '}))
        .pipe(gulp.dest(paths.dest))
        .pipe(livereload());
});

gulp.task('server', function() {
    var app = express();
    app.use(express.static(__dirname + '/build'));
    app.use('/bower_components',  express.static(__dirname + '/bower_components'));
    app.listen(port);
});

gulp.task('default', ['jadeTask', 'watch', 'server']);
