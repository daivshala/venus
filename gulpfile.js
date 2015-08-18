var gulp = require('gulp'),
    $ = require('gulp-load-plugins')(),
    sass = require('gulp-ruby-sass'),
    browserSync = require('browser-sync').create(),
    runSequence = require('run-sequence'),
    bower = require('bower'),
    inject = require('gulp-inject'),
    del = require('del');

// Error logs
function errorLog(error) {
    console.error.bind(error);
    this.emit('end');

}

gulp.task('bower', function() {
  return bower()
    .pipe(gulp.dest('lib/'))
});

// Scripts Task
// Uglifies
gulp.task('scripts', function(){
    gulp.src(['app/services/*.js', 'app/directives/*.js'])
        .on('error', errorLog)
        .pipe($.uglify())
        .pipe($.rename('venus.js'))
        .pipe(gulp.dest('dist'))
        .pipe($.size({title: 'scripts'}));
});

// Clean output directory
gulp.task('clean', del.bind(null, ['.tmp', 'dist/*', '!dist/.git'], {dot: true}));

// Styles Task
// Uglifies
gulp.task('styles', function(){
    return sass('app/styles/scss/venus.scss', {style: 'compressed'})
        .on('error', errorLog)
        .pipe(gulp.dest('dist/styles'))
        .pipe($.size({title: 'styles'}));
});

// Copy web fonts to dist
gulp.task('fonts', function () {
  return gulp.src(['app/styles/fonts/**'])
    .pipe(gulp.dest('dist/styles/fonts/'))
    .pipe($.size({title: 'fonts'}));
});

// Copy directives to dist
gulp.task('directives', function () {
  return gulp.src(['app/directives/*.html'])
    .pipe(gulp.dest('dist/directives'))
    .pipe($.size({title: 'directives'}));
});

gulp.task('bower', function(cb){
  bower.commands.install([], {save: true}, {})
    .on('end', function(installed){
      cb(); // notify gulp that this task is finished
    });
});

gulp.task('index', function(){
    gulp.src('./doc/index.html')
        .pipe(inject(gulp.src(['./doc/bower_components/**/*min.js', './doc/bower_components/**/*.min.css'], {read: false}), {ignorePath: 'doc/', addRootSlash: false}))
        .pipe(gulp.dest('./doc'));
});


// Static server
gulp.task('serve', ['styles'], function() {

    browserSync.init({
        server: "./doc"
    });

    gulp.watch('app/services/*.js', ['scripts']);
    gulp.watch('app/styles/**/*.scss', ['styles']);
    gulp.watch("**/*.html").on('change', browserSync.reload);
});

// gulp.task('default', ['scripts', 'styles', 'fonts', 'serve']);

gulp.task('default', ['clean'], function(cb){
    runSequence(
        'styles',
        ['scripts', 'fonts', 'directives', 'index', 'refresh'],
        'serve',
        cb);
} );


// Copy dist to doc
gulp.task('refresh', function () {
    return gulp.src(['dist/**'])
        .pipe(gulp.dest('doc/dist'));
});


