'use strict';

const gulp  = require('gulp'),
      paths = require('./paths'),
      browserSync = require('browser-sync').create(),
      SRC   = './src';


/**
 * BrowserSync task
 */
gulp.task('serve', () => {
    browserSync.init({
        port: 9000,
        https: true,
        notify: false,
        injectChanges: true,
        minify: false,
        open: false,
        server: {
            baseDir: SRC
        }
    });

    // On change of files reload
    gulp.watch([
        paths.index,
        paths.js.src,
        paths.html,
        paths.htmlDocs
    ]).on('change', browserSync.reload);

    // On change of files reload
    gulp.watch([
        paths.css,
        paths.sassAll
    ]).on('change', () => {
        browserSync.reload('./src/assets/venus.min.css');
        browserSync.reload('./src/assets/venus-docs.min.css');
    });
});

/**
 * BrowserSync task
 */
gulp.task('serve:dist', ['build'], () => {
    browserSync.init({
        port: 9000,
        https: true,
        notify: false,
        injectChanges: true,
        minify: false,
        open: false,
        server: {
            baseDir: paths.docs
        }
    });
});
