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
                'public/css/main.css': [
                    'bower_components/csswizardry-grids/csswizardry-grids.scss',
                    'css/main.sass'
                ]
            }
        }
    },
    watch: {
      files: ['<%= jshint.files %>'],
      tasks: ['jshint']
    }
  });

  grunt.registerTask('default', ['sass', 'jshint']);


  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-sass');


};
