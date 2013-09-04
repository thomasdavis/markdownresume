define([
  'jquery',
  'underscore',
  'backbone',
  'mustache',
  'models/session',
  'text!templates/home/page.html',
  'epiceditor'
], function($, _, Backbone, Mustache, Session, homeTemplate, marked){
  var ExamplePage = Backbone.View.extend({
    el: '.page',
    initialize: function () {
      var that = this;
      Session.on('change:auth', function (session) {
        that.render();
      });
    },
    render: function () {
        var that = this;
        this.$el.hide().fadeIn(250);
        
        $('.top-bar-menu li a.active').removeClass('active');
        $('.top-bar-menu li a.home-button').addClass('active');
        if(Session.get('auth')){
          this.$el.html(Mustache.render(homeTemplate, {email: Session.get('email')}));



        } else {
          this.$el.html(Mustache.render(homeTemplate, {email: false, errors: Session.get('errors'), _: _})); 
        }

var height = $(window).height() - 105; 
$("#epiceditor").height(height);
        window.onresize = function() {
var height = $(window).height() - 105; 
$("#epiceditor").height(height);
}
        var opts = {
  container: 'epiceditor',
  textarea: null,
  basePath: '/repos/resume/',
  clientSideStorage: true,
  localStorageName: 'epiceditor',
  useNativeFullscreen: true,
  parser: marked,
  file: {
    name: 'epiceditor',
    defaultContent: '',
    autoSave: 100
  },
  theme: {
    base: '/css/epiceditor/themes/base/epiceditor.css',
    preview: '/css/epiceditor/themes/preview/github.css',
    editor: '/css/epiceditor/themes/editor/epic-dark.css'
  },
  button: {
    preview: true,
    fullscreen: true,
    bar: "auto"
  },
  focusOnLoad: false,
  shortcut: {
    modifier: 18,
    fullscreen: 70,
    preview: 80
  },
  string: {
    togglePreview: 'Toggle Preview Mode',
    toggleEdit: 'Toggle Edit Mode',
    toggleFullscreen: 'Enter Fullscreen'
  },
  autogrow: false
} 
var editor = new EpicEditor(opts).load();





    }, 
    clean: function () {
    }
  });
  return ExamplePage;
});
