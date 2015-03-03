'use strict';

module.exports = function(config) {

  config.set({
    basePath : '..', //!\\ Ignored through gulp-karma //!\\

    files : [ //!\\ Ignored through gulp-karma //!\\
      'app/libs/jquery/dist/jquery.js',
      'app/libs/angular/angular.js',
      'app/libs/bootstrap/dist/js/bootstrap.js',
      'app/libs/angular-route/angular-route.js',
      'app/libs/angular-resource/angular-resource.js',
      'app/libs/angular-animate/angular-animate.js',
      'app/libs/angular-mocks/angular-mocks.js',
      'app/js/app.js',
      'app/js/controllers/main.controller.js',
      'app/js/services/main.service.js',
      'test/unit/main.js'
    ],

    // testing framework to use (jasmine/mocha/qunit/...)
    frameworks: ['jasmine'],

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    //reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false
  });

};
