// Gruntfile with the configuration of grunt-express and grunt-open. No livereload yet!
module.exports = function(grunt) {
 
  // Load Grunt tasks declared in the package.json file
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  var scripts = {
        js: [],
        css: []
      };

  Object.keys(grunt.file.readJSON('./bower.json').dependencies).map(
        function(file) {
            scripts.js.push('source/lib/'+file+'.js');
        }
  );

  Object.keys(grunt.file.readJSON('./bower.json').dependencies).map(
        function(file) {
            scripts.css.push('source/css/lib/'+file+'.css');
        }
  );
 
  // Configure Grunt 
  grunt.initConfig({

    htmlbuild: {
        source: {
            src: 'template/source/index.html',
            dest: 'source/index.html',
            options: {
                beautify: true,
                relative: true,
                scripts: {
                    bundle: [
                              scripts.js,
                              'source/lib/**/*.js',
                              'source/scripts/**/*.js'
                            ]
                },
                styles: {
                    bundle: [ 
                        'source/css/dist/css/bootstrap.css',
                        'source/css/attach.css',
                        scripts.css
                    ]
                },
                sections: {
                    layout: {
                        header: 'template/source/header.html',
                        footer: 'template/source/footer.html'
                    }
                },
            }
        },
        distro: {
            src: 'template/source/index.html',
            dest: 'distro/',
            options: {
                scripts: {
                    bundle: [
                              'distro/js/**/*.js'
                            ]
                },
                styles: {
                    bundle: [ 
                        'distro/css/**/*.css'
                    ]
                },
                sections: {
                    layout: {
                        header: 'template/source/header.html',
                        footer: 'template/source/footer.html'
                    }
                },
            }
        }
    },

    uglify: {
      options: {
        mangle: false
      },
      distro: {
        files: [{
            expand: true,
            cwd: 'distro/js',
            src: '**/*.js',
            dest: 'distro/js'
        }]
      }
    },

    cssmin: {
      distro: {
        files: [{
          expand: true,
          cwd: 'distro/css',
          src: '**/*.css',
          dest: 'distro/css',
        }]
      }
    },

    bower: {
      dev: {
        dest: 'source/',
        js_dest: 'source/lib',
        options: {
          ignorePackages: ['jquery','less'],
          packageSpecific: {
            'angular-material': {
              css_dest: 'source/css/lib/'
            },
            'ngStorage':{
              js_dest:'source/js/lib'
            }
          }
        }
      }
    },

    copy: {
      index: {
        expand: true,
        cwd: 'source/',
        src: 'index.html',
        dest: 'distro/',
      },
      views: {
        expand: true,
        cwd: 'source/views',
        src: '*.html',
        dest: 'distro/views',
      },
      scripts: {
        expand: true,
        cwd: 'source/scripts/',
        src: '**/*.js',
        dest: 'distro/scripts/',
      },
      svg: {
        expand: true,
        cwd: 'source/svg/',
        src: '*.svg',
        dest: 'distro/svg/'
      }
    },

    concat: {
      css:{
        src: ['source/css/attach.css',
              'source/css/lib/**/*.css'],
        dest: 'distro/css/distro.css'

      },
      js:{
        src:['source/lib/angular.js',
            'source/lib/**/*.js',
            'source/scripts/**/*.js'],
        dest:'distro/js/distro.js'
      }
    },

    jshint: {

      all: ['source/scripts/**/*.js']
    },

    compress: {
      distro: {
        options: {
          archive: 'export/distro.zip'
        },
        expand: true,
        cwd: 'distro',
        src: ['**']
      }
    },

    clean: {
      source:["source/lib",
              "source/css/lib"],
      distro:["distro"]
    },
   
    //*****************************************************
 
    // grunt-express will serve the files from the folders listed in `bases`
    // on specified `port` and `hostname`
    express: {
      all: {
        options: {
          port: 8080,
          hostname: "0.0.0.0",
          bases: ['source'], // Replace with the directory you want the files served from
                              // Make sure you don't use `.` or `..` in the path as Express
                              // is likely to return 403 Forbidden responses if you do
                              // http://stackoverflow.com/questions/14594121/express-res-sendfile-throwing-forbidden-error
          livereload: true
        }
      }
    },
 
    // grunt-watch will monitor the projects files
    watch: {
      all: {
        tasks: ['jshint:all','htmlbuild'],
        files: ['template/**/*.html',
                'source/views/**/*.html',
                'source/**/*.js',
                'source/config/**.js',
                'source/scripts/**/*.js',
                'source/css/**/**.css'],
        options: {
          livereload: true
        }
      }
    },
 
    // grunt-open will open your browser at the project's URL
    open: {
      all: {
        // Gets the port from the connect configuration
        path: 'http://localhost:<%= express.all.options.port%>'
      }
    }
  });
 
  // Creates the `swam` task
  grunt.registerTask('swam', [
    'clean:source',
    'bower',
    'htmlbuild:source',
    'express',
    'open',
    'watch'
  ]);

  grunt.registerTask('distro', [
    'clean:distro',
    'concat:css',
    'concat:js',
    'copy:views',
    'copy:svg',
    'uglify:distro',
    'cssmin:distro',
    'htmlbuild:distro',
    'compress:distro'
  ]);

};