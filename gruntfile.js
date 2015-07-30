module.exports = function(grunt) {

    grunt.initConfig({
        jshint: {
            files: ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js'],
            options: {
                globals: {
                    jQuery: true
                }
            }
        },
        sass: {
            options: {
                sourceMap: true,
                outputStyle: 'compressed'
            },
            dist: {
                files: {
                    'css/grid.css': 'bower_components/csswizardry-grids/csswizardry-grids.scss',
                    'css/main.css': 'css/main.sass'
                }
            }
        },
        concat: {
            dist: {
                src: ['css/grid.css', 'css/main.css'],
                dest: 'public/css/main.css'
            }
        },
        watch: {
            files: ['<%= jshint.files %>'],
            tasks: ['jshint']
        }
    });

    grunt.registerTask('default', ['sass', 'concat', 'jshint']);


    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-sass');


};
