// Gruntfile.js
//We got a lot of help from this site here, great tutorial on how this works.
//https://scotch.io/tutorials/a-simple-guide-to-getting-started-with-grunt



// our wrapper function (required by grunt and its plugins)
// all configuration goes inside this function
module.exports = function(grunt) {

  // ===========================================================================
  // CONFIGURE GRUNT ===========================================================
  // ===========================================================================
  grunt.initConfig({

    // get the configuration info from package.json ----------------------------
    // this way we can use things like name and version (pkg.name)
    pkg: grunt.file.readJSON('package.json'),

    // all of our configuration will go here

     // configure jshint to validate js files -----------------------------------
    jshint: {
      options: {
		  curly:  true,
		  immed:  true,
		  newcap: true,
		  noarg:  true,
		  sub:    true,
		  boss:   true,
		  eqnull: true,
		  node:   true,
		  undef:  true,
      //esnext: true,
		  globals: {
        chatApp: true,
		    _:       false,
		    jQuery:  false,
		    angular: false,
		    moment:  false,
		    console: false,
		    $:       false,
		    io:      false
		  }
		 },

      // when this task is run, lint the Gruntfile and all js files in src
      build: ['Gruntfile.js', 'src/**/*.js']
    },

    uglify: {
      options: {
        banner: '/*\n <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> \n*/\n'
      },
      build: {
        files: {
            'dist/js/Every.min.js': ['src/app.js','src/services/socket.js', 'src/login/loginController.js', 'src/navBar/navBarController.js', 'src/roomlist/RoomlistContoller.js','src/newroom/CreateRoomController.js', 'src/room/RoomController.js']
            //'src/login/loginController.js', 'src/navBar/navBarController.js', 'src/roomlist/RoomlistContoller.js','src/newroom/CreateRoomController.js', 'src/room/RoomController.js'
        }
      }
    },
     // configure cssmin to minify css files ------------------------------------
    cssmin: {
      options: {
        banner: '/*\n <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> \n*/\n'
      },
      build: {
        files: {
          'dist/css/style.min.css': 'src/css/style.css'
        }
      }
    }

  });

  // ============= // CREATE TASKS ========== //
    grunt.registerTask('default', ['jshint', 'uglify', 'cssmin']);

  // ===========================================================================
  // LOAD GRUNT PLUGINS ========================================================
  // ===========================================================================
  // we can only load these if they are in our package.json
  // make sure you have run npm install so our app can find these
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  


};