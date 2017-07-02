module.exports = function(grunt) {
    'use strict';
    grunt.initConfig({
        copy: {
            main: {
                expand: true,
                cwd: 'web',
                src: '**',
                dest: 'dest/',
            },
        },
        uglify: {
            options: {
                mangle: false
            },
            my_target: {
                files: {
                    'dest/app/components/search/search.controller.js': ['web/app/components/search/search.controller.js'],
                    'dest/app/components/search/search.service.js': ['web/app/components/search/search.service.js'],
                    'dest/app/shared/api.config.js': ['web/app/shared/api.config.js'],
                    'dest/app/shared/http.service.js': ['web/app/shared/http.service.js']
                }

            }
        },
        ngdocs: {
            all: ['web/app/components/search/search.controller.js']
        }
    });
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-ngdocs');
    grunt.registerTask('default', ['copy', 'uglify', 'ngdocs']);
};