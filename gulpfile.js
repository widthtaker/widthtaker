'use strict';

const gulp = require('gulp'),
    gutil = require('gulp-util'),
    eslint = require('gulp-eslint'),
    uglify = require('gulp-uglify'),
    pump = require('pump'),
    rename = require('gulp-rename'),
    bs = require('browser-sync').create(),
    useref = require('gulp-useref'),
    babel = require('gulp-babel');

gulp.task('default', () => {
  return gutil.log('Gulp is running!');
});

gulp.task('dev', ['updateref', 'watch'], () => {
  return gutil.log('In development...');
});

gulp.task('build', ['compress', 'notcompressed'], () => {
  return gutil.log('Building the source files...');
});

gulp.task('browser-sync', () => {
  bs.init({
    server: {
      baseDir: './'
    }
  });
});

gulp.task('updateref', (cb) => {
  pump([
    gulp.src('index.html'),
    useref(),
    gulp.dest('./')
  ], cb);
});

gulp.task('eslint', (cb) => {
  pump([
    gulp.src('src/*.js'),
    eslint(),
    eslint.format(),
    eslint.failAfterError()
  ], cb);
});

gulp.task('compress', (cb) => {
  pump([
    gulp.src('src/*.js'),
    babel({
      presets: ['es2015']
    }),
    uglify(),
    rename((path) => {
      path.basename += '.min';
    }),
    gulp.dest('dist')
  ], cb);
});

gulp.task('notcompressed', (cb) => {
  pump([
    gulp.src('src/*.js'),
    babel({
      presets: ['es2015']
    }),
    gulp.dest('dist')
  ], cb);
});

gulp.task('watch', ['browser-sync'], () => {
  gulp.watch('src/*.js', ['eslint', 'compress', 'notcompressed']);
  gulp.watch(['src/*.js', '*.html', '*.css']).on('change', bs.reload);
});
