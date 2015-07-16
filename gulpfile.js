var gulp = require('gulp'),
    gutil = require('gulp-util');

var paths = {
    jade: ['app/templates/**/*.jade', '!app/templates/partials/**/*.jade'],
    images: 'client/img/**/*'
},
    port = 3000;

// Rerun the task when a file changes
gulp.task('watch', function() {
    gulp.watch(paths.jade, ['jadeTask']);
});

gulp.task('server', function() {
    var app = connect();
    app.listen(port);
});

// gulp.task('default', ['watch', 'server']);
gulp.task('default', function(){
    gutil.log('Sup');
});