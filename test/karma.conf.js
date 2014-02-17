module.exports = function(config) {
    config.set({
        basePath : '../',

        files : [
            'lib/jquery-1.10.2.min.js',
            'lib/tt-uikit-0.11.0.min.js',
            'lib/angular-1.2.13.js',
            'lib/angular-mocks-1.2.12.js',
            'angular-uikit/**/*.js',
            'test/unit/**/*.js'
        ],

        exclude : [],

        autoWatch : true,

        frameworks: ['jasmine'],

        browsers : ['Chrome'],

        plugins : [
            'karma-chrome-launcher',
            'karma-script-launcher',
            'karma-jasmine'
        ],

        junitReporter : {
            outputFile: 'test_out/unit.xml',
            suite: 'unit'
        }
    });
};
