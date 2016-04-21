'use strict';

const gulp = require('gulp');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const reactify = require('reactify');
const babelify = require('babelify');
const mocha = require('gulp-mocha');
const babel = require('babel/register');
const del = require('del');
const rename = require('gulp-rename');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');

const paths = {
    scripts: ['./js/**/*.jsx', './js/**/*.js']
};

const settings = {
    environment: process.env.NODE_ENV || 'production',
    jsConfigFolder: './client/source/js/config',
    sourceFolder: './client/source',
    cssSourceFile: './client/source/css/main.scss',
    preBuildFolder: './client/pre-build',
    jsBuildFolder: './client/pre-build/js',
    destFolder: './public',
    jsDestFolder: './public/js'
};

gulp.task('clean', () => {
    del(settings.preBuildFolder + '/**/*');
    del(settings.destFolder + '/**/*');
});

gulp.task('css', ['clean'], () => {
    gulp.src(settings.cssSourceFile)
      .pipe(sourcemaps.init())
      .pipe(sass({outputStyle: 'compressed'}))
      .pipe(sourcemaps.write())
      .pipe(gulp.dest(settings.destFolder + '/css'));
});

gulp.task('config', ['copy-js-source', 'css', 'clean'], () => {
    console.log('building for ' + settings.environment + '...');

    return gulp.src(settings.jsConfigFolder + '/' + settings.environment + '.js')
               .pipe(rename('config.js'))
               .pipe(gulp.dest(settings.jsBuildFolder));
});

gulp.task('copy-js-source', ['clean'], () => {
    return gulp.src([
        settings.sourceFolder + '/js/**/*',
        '!' + settings.sourceFolder + '/js/config',
        '!' + settings.sourceFolder + '/js/config/**/*'
    ]).pipe(gulp.dest(settings.jsBuildFolder));
});

gulp.task('browserify', ['config', 'copy-js-source'], () => {
    let b = browserify();
    b.transform(reactify);
    b.transform(babelify);
    b.add(settings.preBuildFolder + '/js/app.jsx');

    return b.bundle()
            .pipe(source('main.js'))
            .pipe(gulp.dest(settings.jsDestFolder));
});

// TODO: Fix.
// gulp.task('watch', function() {
//     gulp.watch(paths.scripts, ['browserify']);
// });

gulp.task('test', () => {
    return gulp.src('test/**/*.js')
        .pipe(mocha({
            timeout: 10000,
            compilers: {
                js: babel
            }
        }));
});

gulp.task('default', ['browserify']);
