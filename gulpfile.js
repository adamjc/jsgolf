var gulp = require('gulp');
var watch = require('gulp-watch');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var reactify = require('reactify');
var run = require('gulp-run');
var babelify = require('babelify');
var mocha = require('gulp-mocha');
var babel = require('babel/register');
var del = require('del');
var rename = require('gulp-rename');

var paths = {
    scripts: ['./js/**/*.jsx', './js/**/*.js']
};

var settings = {
    environment: process.env.NODE_ENV || 'production',
    configFolder: './client/source/js/config',
    sourceFolder: './client/source/js',
    buildFolder: './client/pre-build/js',
    destFolder: './public/js'
};

gulp.task('clean', function() {
    return del(settings.buildFolder + '/**/*');
});

gulp.task('config', ['clean'], function() {
    console.log('building for ' + settings.environment + '...');
    return gulp.src(settings.configFolder + '/' + settings.environment + '.js')
               .pipe(rename('config.js'))
               .pipe(gulp.dest(settings.buildFolder));
});

gulp.task('copy-source', ['clean'], function() {
    return gulp.src([
        settings.sourceFolder + '/**/*',
        '!' + settings.sourceFolder + '/config',
        '!' + settings.sourceFolder + '/config/**/*'
    ]).pipe(gulp.dest(settings.buildFolder));
});

gulp.task('browserify', ['config', 'copy-source'], function() {
    var b = browserify();
    b.transform(reactify);
    b.transform(babelify);
    b.add(settings.buildFolder + '/app.jsx');
    return b.bundle()
            .pipe(source('main.js'))
            .pipe(gulp.dest(settings.destFolder));
});

// TODO: Fix.
// gulp.task('watch', function() {
//     gulp.watch(paths.scripts, ['browserify']);
// });

gulp.task('test', function() {
    return gulp.src('tests/**/*.js')
        .pipe(mocha({
            compilers: {
                js: babel
            }
        }));
});

gulp.task('default', ['browserify'], function () {
});
