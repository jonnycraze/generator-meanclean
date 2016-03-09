'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.generators.Base.extend({

	prompting: function() {
		var done = this.async();
		this.prompt({
			type: 'input',
			name: 'name',
			message: 'Create a Clean MEAN start',
			//Defaults to the project's folder name if the input is skipped
			default: this.appname
		}, function(answers) {
			this.props = answers
			this.log(answers.name);
			done();
		}.bind(this));
	},

	writing: {
	 	//Copy the configuration files
	  config: function () {
      this.fs.copyTpl(
          this.templatePath('_package.json'),
          this.destinationPath('package.json'), {
              name: this.props.name
          }
      );
      this.fs.copyTpl(
          this.templatePath('_bower.json'),
          this.destinationPath('bower.json'), {
              name: this.props.name
          }
      );
      // this.fs.copy(
      //   this.templatePath('bowerrc'),
      //   this.destinationPath('.bowerrc')
      // );
    },

		//Copy application files
		app: function() {
		  //Server file
		  this.fs.copy(
		    this.templatePath('_server.js'),
		    this.destinationPath('server.js'),
		    this.destinationPath('/server.js')
		  );

		  ///// DB Connect 
		  this.fs.copy(
		    this.templatePath('_server/_config/_db.js'),
		    this.destinationPath('server/config/db.js'));


		  // Server Setup
		  this.fs.copy(
		    this.templatePath('_server/_routes.js'),
		    this.destinationPath('server/routes.js')
		  );
		  this.fs.copy(
		    this.templatePath('_server/_controllers'),
		    this.destinationPath('server/controllers')
		  );
		  this.fs.copy(
		    this.templatePath('_server/_models'),
		    this.destinationPath('server/models')
		  );

		  // Client Setup
		  this.fs.copy(
		    this.templatePath('_client/_libs'),
		    this.destinationPath('client/libs')
		  );
		  this.fs.copy(
		    this.templatePath('_client/_src/_css'),
		    this.destinationPath('client/src/css')
		  );
		  this.fs.copy(
		    this.templatePath('_client/_src/_index.html'),
		    this.destinationPath('client/src/index.html')
		  );
		  //// Angular Directories
		  this.fs.copy(
		    this.templatePath('_client/_src/_js/_controllers'),
		    this.destinationPath('client/src/js/controllers')
		  );
		  this.fs.copy(
		    this.templatePath('_client/_src/_js/_directives'),
		    this.destinationPath('client/src/js/directives')
		  );
		  this.fs.copy(
		    this.templatePath('_client/_src/_js/_factories'),
		    this.destinationPath('client/src/js/factories')
		  );
		  this.fs.copy(
		    this.templatePath('_client/_src/_js/_services'),
		    this.destinationPath('client/src/js/services')
		  );
		  //// Views
		  this.fs.copy(
		    this.templatePath('_client/_src/_views/_landing.html'),
		    this.destinationPath('client/src/views/landing.html')
		  );
		  this.fs.copy(
		    this.templatePath('_client/_src/_views/_partials'),
		    this.destinationPath('client/src/views/partials')
		  );
		},

		//Install Dependencies
		install: function() {
		  this.installDependencies({
		  	bower: true,
		  	npm: true,
		  	callback: function(){
		  		console.log('everything is ready!');
		  	}
		  });
		}
	}

});
