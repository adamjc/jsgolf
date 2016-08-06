'use strict'

const gulp = require('gulp')
const browserify = require('browserify')
const source = require('vinyl-source-stream')
const reactify = require('reactify')
const babelify = require('babelify')
const mocha = require('gulp-mocha')
const babel = require('babel/register')
const del = require('del')
const sass = require('gulp-sass')
const sourcemaps = require('gulp-sourcemaps')
const uglify = require('gulp-uglify')
const buffer = require('vinyl-buffer')

const paths = {
    scripts: ['./client/**/*.jsx', './client/**/*.js'],
    css: ['./client/**/*.scss']
}

const settings = {
    sourceFolder: './client/source',
    cssSourceFile: './client/source/css/main.scss',
    destFolder: './public'
}

gulp.task('clean', () => {
    del(`${settings.destFolder}/**/*`)
})

gulp.task('css', () => {
    gulp.src(settings.cssSourceFile)
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(`${settings.destFolder}/css`))
})

gulp.task('browserify', () => {
    let b = browserify()
    b.transform(reactify)
    b.transform(babelify)
    b.add(`${settings.sourceFolder}/js/app.jsx`)

    return b.bundle()
            .pipe(source('main.js'))
            .pipe(buffer())
            .pipe(uglify())
            .pipe(gulp.dest(`${settings.destFolder}/js`))
})

gulp.task('watch', function() {
    gulp.watch(paths.scripts, ['browserify'])
    gulp.watch(paths.css, ['css'])
})

gulp.task('test', () => {
    return gulp.src('test/**/*.js')
        .pipe(mocha({
            timeout: 10000,
            compilers: {
                js: babel
            }
        }))
})

gulp.task('default', ['browserify', 'css'])
