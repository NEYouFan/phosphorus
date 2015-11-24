'use strict'

var del = require('del')
var gulp = require("gulp");
var gulpif = require("gulp-if")
var minifyCss = require('gulp-minify-css')
var zip = require('gulp-zip')
var change = require('gulp-change')

gulp.task('clean-chrome', (cb) => {
    return del(['chrome', 'chrome.zip'])
})

gulp.task('change-html', ['clean-chrome'], (cb) => {
    let performChange = (content) => {
        return content.replace('<script src="http://localhost:7070/webpack-dev-server.js"></script>', '').replace('http://localhost:7070/assets/index.js', 'dist/index.js')
    }
    return gulp.src('index.html')
        .pipe(change(performChange))
        .pipe(gulp.dest('chrome'))
})

gulp.task('change-manifest', ['change-html'], (cb) => {
    let performChange = (content) => {
        return content.replace(' http://localhost:7070/assets/index.js', '').replace(' http://localhost:7070/webpack-dev-server.js', '')
    }
    return gulp.src('manifest.json')
        .pipe(change(performChange))
        .pipe(gulp.dest('chrome'))
})

gulp.task('extract-files', ['change-manifest'], (cb) => {
    let cssFilter = function (file) {
        if (file.path.match(/\.css$/)) {
            return true
        }
    }
    return gulp.src([
        'dist/**/*.*',
        'images/**/*.*',
        'js/**/*.*',
        'dev/libs/bootstrap/**/*.*'
    ], {base: './'})
        .pipe(gulpif(cssFilter, minifyCss()))
        .pipe(gulp.dest('chrome'))
        .pipe(zip('chrome.zip'))
        .pipe(gulp.dest('.'))
})

gulp.task('release', ['extract-files'], (cb) => {
    let cssFilter = function (file) {
        if (file.path.match(/\.css$/)) {
            return true
        }
    }
    return gulp.src(['chrome/**/*.*'])
        .pipe(zip('chrome.zip'))
        .pipe(gulp.dest('.'))
})

gulp.start('release')