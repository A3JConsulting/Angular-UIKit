module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            options: {
                separator: ';'
            },
            dist: {
                src: [
                    'angular-uikit/uikit.js',
                    'angular-uikit/directives.js',
                    'angular-uikit/services.js'
                ],
                dest: 'dist/<%= pkg.name %>.js'
            }
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            dist: {
                files: {
                    'dist/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
                }
            }
        },
        karma: {
            unit: {
                configFile: 'test/karma.conf.js',
                singleRun: true
            }
        },
        watch: {
            concat: {
                files: 'js/*.js',
                tasks: ['concat']
            },
            uglify: {
                files: '<%= concat.dist.dest %>',
                tasks: ['uglify']
            }
        },
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('test', ['karma']);

    grunt.registerTask('dist-js', ['concat', 'uglify']);

    grunt.registerTask('dist', ['dist-js']);

    grunt.registerTask('default', ['dist', 'test']);
};
