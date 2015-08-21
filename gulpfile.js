var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var sass = require('gulp-ruby-sass');
var browserSync = require('browser-sync').create();
var runSequence = require('run-sequence');
var bower = require('bower');
var inject = require('gulp-inject');
var del = require('del');

// Error logs
function errorLog(error) {
    console.error.bind(error);
    this.emit('end');
}

// Scripts Task
// Uglifies
gulp.task('uglify', function(){
    gulp.src(['app/directives/*.js', 'app/services/*.js'])
        .on('error', errorLog)
        .pipe($.uglify())
        .pipe($.rename('venus.js'))
        .pipe(gulp.dest('dist/scripts/'))
        .pipe($.size({title: 'Uglify venus scripts'}));

    gulp.src(['app/scripts/**/*.js'])
        .on('error', errorLog)
        .pipe($.uglify())
        .pipe($.rename('app.js'))
        .pipe(gulp.dest('dist/scripts/'))
        .pipe($.size({title: 'Uglify app scripts'}));
});

// Clean output directory
gulp.task('clean', del.bind(null, ['.tmp', 'dist/*', '!dist/.git'], {dot: true}));

// Styles Task
// Uglifies
gulp.task('styles', function(){
    return sass('app/styles/scss/venus.scss', {style: 'compressed'})
        .on('error', errorLog)
        .pipe(gulp.dest('app/styles'))
        .pipe(gulp.dest('dist/styles'))
        .pipe($.size({title: 'Build css styles'}));
});

gulp.task('stylesMain', function(){
    return sass('app/styles/scss/main.scss', {style: 'compressed'})
        .on('error', errorLog)
        .pipe(gulp.dest('app/styles'))
        .pipe(gulp.dest('dist/styles'))
        .pipe($.size({title: 'Build css styles'}));
});

gulp.task('stylesCode', function(){
    return sass('app/styles/scss/code-show.scss', {style: 'compressed'})
        .on('error', errorLog)
        .pipe(gulp.dest('app/styles'))
        .pipe(gulp.dest('dist/styles'))
        .pipe($.size({title: 'Build css styles'}));
});

// Copy web fonts to dist
gulp.task('fonts', function () {
  return gulp.src(['app/styles/fonts/**'])
    .pipe(gulp.dest('dist/styles/fonts/'))
    .pipe($.size({title: 'fonts'}));
});

// Copy directives to dist
gulp.task('directivesHtml', function () {
  return gulp.src(['app/directives/*.html'])
    .pipe(gulp.dest('dist/directives'))
    .pipe($.size({title: 'Copy directives htmls'}));
});

gulp.task('bower', function(cb){
  bower.commands.install([], {save: true}, {})
    .on('end', function(installed){
      cb(); // notify gulp that this task is finished
    });
});

gulp.task('inject', function(){
    gulp.src('app/index.html')
        .pipe(inject(gulp.src(['bower_components/**/*min.js', 'bower_components/**/*.min.css', 'app/scripts/**/*.js', 'app/styles/**/*.css', 'app/directives/**/*.js', 'app/services/**/*.js'], {read: false}), {ignorePath: 'app/'}))
        .pipe(gulp.dest('app'));
    gulp.src('app/index.html')
        .pipe(inject(gulp.src(['dist/scripts/**/*.js', 'dist/styles/**/*.css'], {read: false}), {ignorePath: 'dist/'}))
        .pipe(gulp.dest('dist'));
});

// Static server
gulp.task('serve', ['inject','styles','stylesMain','stylesCode'], function() {

    browserSync.init({
        server: {
            baseDir: "app",
            routes: {
                "/bower_components": "bower_components"
            }
        }
    });

    gulp.watch(['app/directives/*.js','app/services/*.js'], ['uglify']);
    gulp.watch(['app/scripts/**/*.js'], ['uglify']);
    gulp.watch('app/styles/**/*.scss', ['styles']);
    gulp.watch('**/*.html').on('change', browserSync.reload);
});

// gulp.task('default', ['ulglify', 'styles', 'fonts', 'serve']);

gulp.task('default', ['clean'], function(cb){
    runSequence(
        'bower',
        ['uglify', 'fonts'],
        'styles','stylesMain','stylesCode',
        'inject',
        'serve',
        cb);
} );


// // Copy dist to doc
// gulp.task('refresh', function () {
//     return gulp.src(['dist/**'])
//         .pipe(gulp.dest('doc/dist'));
// });
