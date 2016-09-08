var paths = {
    js: {
        src: [
            './src/scripts/*.js',
            './src/scripts/**/*.js',
            '!./src/scripts/Views.js',
            '!./src/scripts/libs/*',
        ],
    },
    html: [
        './src/templates/{,*/,*/*/,*/*/*/}*.html',
        '!./src/templates/docs/{,*/,*/*/,*/*/*/}*.html',
        '!./src/templates/code-examples/{,*/,*/*/,*/*/*/}*.html',
        '!./src/templates/directives/docs/{,*/,*/*/,*/*/*/}*.html',
    ],
    htmlDocs: [
        './src/templates/docs/{,*/,*/*/,*/*/*/}*.html',
        './src/templates/code-examples/{,*/,*/*/,*/*/*/}*.html',
        './src/templates/directives/docs/{,*/,*/*/,*/*/*/}*.html',
    ],
    sass   : './src/assets/sass/venus.min.scss',
    sassDoc: './src/assets/sass/docs/venus-docs.min.scss',
    sassAll: './src/assets/sass/{,*/}*.scss',
    css    : './src/assets/css/*.css',
    index  : './src/index.html',
    images : [
        './src/assets/icons/{,*/}*.{png,jpg,jpeg,gif,ico}',
        './src/assets/images/{,*/}*.{png,jpg,jpeg,gif,ico}',
    ],
    svg: [
        './src/assets/images/*.svg',
        './src/assets/images/**/*.svg',
        './src/assets/icons/**/*.svg',
    ],
    docs: './docs',
    dist: './dist',
};

module.exports = paths;
