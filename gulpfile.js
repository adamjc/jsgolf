var gulp = require('gulp');
var watch = require('gulp-watch');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var reactify = require('reactify');
var run = require('gulp-run');
var babelify = require('babelify');
var mocha = require('gulp-mocha');
var babel = require('babel/register');

var paths = {
    scripts: ['js/**/*.jsx', 'js/**/*.js']
};

gulp.task('browserify', function () {
    var b = browserify();
    b.transform(reactify);
    b.transform(babelify);
    b.add('js/app.jsx');
    return b.bundle()
            .pipe(source('main.js'))
            .pipe(gulp.dest('./public/js'));
});

gulp.task('watch', function () {
    gulp.watch(paths.scripts, ['browserify']);
});

gulp.task('test', function () {
    return gulp.src('tests/**/*.js')
        .pipe(mocha({
            compilers: {
                js: babel
            }
        }));
});

gulp.task('default', ['browserify'], function () {});
