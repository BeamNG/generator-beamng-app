var yeoman = require('yeoman-generator')
  , changeCase = require('change-case')
  , util = require('util')
;

var BeamngAppGenerator = yeoman.Base.extend({
  promptUserDialog: function () {
    var done = this.async();

    this.log('Welcome to the BeamNG app generator!');

    var prompts = [
      {
        name: 'appName',
        message: 'What is the app\'s name?'
      }, {
        name: 'author',
        message: 'Who are you?'
      }, {
        name: 'description',
        message: 'Add a brief description'
      }, {
        type: 'list',
        name: 'template',
        message: 'Choose an app template',
        choices: [{name: 'General', value: 'general'},
                  {name: 'SVG',     value: 'svg'    },
                  {name: 'Canvas',  value: 'canvas' }],
        default: 'general'
      }, {
        type: 'list',
        name: 'align',
        message: 'What corner is the app initially aligned to?',
        choices: [{ name: 'Top Left', value: 'TL' },
                  { name: 'Top Right',value: 'TR' },
                  { name: 'Bottom Left', value: 'BL'},
                  { name: 'Bottom Right', value: 'BR'}]
      }, {
        name: 'top',
        message: 'Distance from top (px)?',
        default: 0,
        when: function (answers) {
          return answers.align.indexOf('T') != -1;
        }
      }, {
        name: 'left',
        message: 'Distance from left (px)?',
        default: 0,
        when: function (answers) {
          return answers.align.indexOf('L') != -1;
        }
      }, {
        name: 'bottom',
        message: 'Distance from bottom (px)?',
        default: 0,
        when: function (answers) {
          return answers.align.indexOf('B') != -1;
        }
      }, {
        name: 'right',
        message: 'Distance from right (px)?',
        default: 0,
        when: function (answers) {
          return answers.align.indexOf('R') != -1;
        }
      }, {
        name: 'width',
        message: 'App dimensions: width (px)?',
        default: 100
      }, {
        name: 'height',
        message: 'App dimensions: height (px)?',
        default: 100
      }, {
        name: 'streams',
        message: 'What streams will the app use? (comma-separated list, empty for none)'
      }, {
        name: 'hasSettings',
        message: 'Does your app need to save any data (e.g. app state)?',
        type: 'confirm',
        default: false
      }
    ];

    this.prompt(prompts, function (values) {

      this.appName = values.appName;
      this.dirName = changeCase.pascalCase(values.appName);
      this.author = values.author;
      this.description = values.description;
      this.appTemplate = values.template;
      this.align = values.align;
      this.streams = values.streams.trim() ? values.streams.split(',').map(function (x) { return x.trim(); }) : [];
      this.top    = isNaN(values.top) ?  null : values.top + 'px';
      this.bottom = isNaN(values.bottom) ? null : values.bottom + 'px';
      this.left   = isNaN(values.left) ? null : values.left + 'px';
      this.right  = isNaN(values.right) ? null : values.right + 'px';
      this.width = values.width + 'px';
      this.height = values.height + 'px';
      this.hasSettings = values.hasSettings;

      // ... and an extra prompt
      this.prompt({
        message: 'What is the directive name?',
        name: 'directive',
        default: changeCase.camelCase(this.appName)
      }, function (v) { 
        this.directive = v.directive;
        this.domElement = changeCase.paramCase(v.directive);
        done(); 
      }.bind(this));
      
    }.bind(this));
  },

  generateFiles: function () {
    switch(this.appTemplate) {
    case 'general':
      this.template('_app.js', this.dirName + '/app.js', this);
      break;
    case 'svg':
      this.template('_app_svg.js', this.dirName + '/app.js', this);
      this.copy('app.svg', this.dirName + '/app.svg');
      break;
    case 'canvas':
      this.template('_app_canvas.js', this.dirName + '/app.js', this);
      break;
    }

    this.template('_app.json', this.dirName + '/app.json', this);
    this.copy('app.png', this.dirName + '/app.png');
    if (this.hasSettings)
      this.copy('settings.json', this.dirName + '/settings.json');
  }
});

module.exports = BeamngAppGenerator;
