'use strict';

var gulp = require('gulp');

// load plugins
var $ = require('gulp-load-plugins')({
  pattern: [
    'gulp-*',
    'main-bower-files',
    'browser-sync',
    'jshint-stylish',
    'merge-stream',
    'wiredep'
  ]
});

var paths = {
  app: 'app/',
  bower: 'app/libs/',
  tmp: '.tmp/',
  dist: 'dist/',
  test: 'test/'
};

var onError = function (err) {
  $.util.log($.util.colors.red(err));
};

gulp.task('scripts', function () {
  return gulp.src([
        paths.app + 'js/**/*.js',
        'gulpfile.js',
        paths.test + '**/*.js'])
      .pipe($.cached('js'))
      .pipe($.jshint())
      .pipe($.jshint.reporter($.jshintStylish))
      .pipe($.size());
});

gulp.task('htmlhint', function() {
  gulp.src([paths.app + '*.html', paths.app + 'partials/{,*/}*.html'])
      .pipe($.cached('html'))
      .pipe($.htmlhint({htmlhintrc: './.htmlhintrc'}))
      .pipe($.htmlhint.reporter())
      .pipe($.size());
});

// inject bower components
gulp.task('wiredep', function () {
  var wiredep = require('wiredep').stream;

  return gulp.src(paths.app + '*.html')
      .pipe($.plumber(onError))
      .pipe(wiredep({
        directory: paths.bower
      }))
      .pipe(gulp.dest(paths.app));
});

gulp.task('clear', function (done) {
  return $.cache.clearAll(done);
});

gulp.task('clean', function () {
  return gulp.src([paths.tmp, paths.dist], {read: false})
      .pipe($.clean());
});

gulp.task('default', ['clean', 'clear'], function () {
  gulp.start('server');
});

function browserSyncInit(baseDir, files, browser, open) {
  browser = browser === undefined ? 'default' : browser;
  open = open === undefined ? 'local' : open;

  $.browserSync.instance = $.browserSync.init(files, {
    server: {
      baseDir: baseDir
    },
    port: 8000,
    browser: browser,
    open: open
  });

}

gulp.task('server', ['watch'], function() {
  browserSyncInit([
    paths.app,
    paths.tmp
  ], [
    paths.app + 'images/**/*',
    paths.app + '*.html',
    paths.app + 'partials/**/*.html',
    paths.app + 'js/**/*.js'
  ]);
});

gulp.task('server:e2e', function () {
  browserSyncInit([
    paths.app,
    paths.tmp
  ], null, null, false);
});

gulp.task('watch', ['wiredep', 'scripts'], function () {
  gulp.watch('bower.json', ['wiredep']);
});

// Downloads the selenium webdriver
/* jshint camelcase:false */
gulp.task('webdriver-update', $.protractor.webdriver_update);

gulp.task('webdriver-standalone', $.protractor.webdriver_standalone);

gulp.task('protractor', ['webdriver-update'], function (done) {
  var testFiles = [
    paths.test + 'e2e/**/*.js'
  ];

  gulp.src(testFiles)
      .pipe($.protractor.protractor({
        configFile: paths.test + 'protractor.conf.js'
      }))
      .on('error', function (err) {
        // Make sure failed tests cause gulp to exit non-zero
        throw err;
      })
      .on('end', function () {
        // Close browser sync server
        $.browserSync.exit();
        done();
      });
});

gulp.task('test:e2e', ['protractor']);

gulp.task('test', function(done) {
  var bowerDeps = $.wiredep({
    directory: paths.bower,
    //exclude: ['bootstrap-sass-official'],
    dependencies: true,
    devDependencies: true
  });

  var testFiles = bowerDeps.js.concat([
    paths.app + 'js/**/*.js',
    paths.test + 'unit/**/*.js'
  ]);
  var karma = require('karma').server;

  karma.start({
    configFile: __dirname + '/' + paths.test + 'karma.conf.js',
    singleRun: true
  }, done);
});
