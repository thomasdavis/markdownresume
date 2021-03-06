define([
  'jquery',
  'underscore',
  'backbone',
  'mustache',
  'models/session',
  'models/resume',
  'text!templates/home/resume.html',
  'epiceditor'
], function($, _, Backbone, Mustache, Session, Resume, homeTemplate, marked){
  var ExamplePage = Backbone.View.extend({
    el: '.page',
    initialize: function (opts) {
      var that = this;
      this.resume = new Resume({id: opts.id});

    },
    render: function () {
        var that = this;
        this.$el.hide().fadeIn(250);
        $('.navbar-nav .active').removeClass('active');
        $('.top-bar-menu li a.active').removeClass('active');
        $('.top-bar-menu li a.home-button').addClass('active');
          this.$el.html(Mustache.render(homeTemplate, {}));

that.resume.fetch({
  success: function (resume) {
    var opts = {
      container: 'epiceditor',
      textarea: null,
      basePath: '',
      clientSideStorage: false,
      localStorageName: 'epiceditor',
      useNativeFullscreen: true,
      parser: marked,
      file: {
        name: 'epiceditor',
        defaultContent: resume.get('markdown'),
        autoSave: 100
      },
      button: false,
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
    if(window.location.host === 'localhost') {
      opts.theme = {
        base: '../css/epiceditor/themes/base/epiceditor.css',
        preview: '../css/epiceditor/themes/preview/github.css',
        editor: '../css/epiceditor/themes/editor/epic-light.css'
      }
    } else {

      opts.theme = {
        base: '/css/epiceditor/themes/base/epiceditor.css',
        preview: '/css/epiceditor/themes/preview/github.css',
        editor: '/css/epiceditor/themes/editor/epic-light.css'
      }
    }
    that.editor = new EpicEditor(opts).load();
    that.editor.preview();
  }
})

     

var height = $(window).height() - 111; 
$("#epiceditor").height(height);
        window.onresize = function() {
var height = $(window).height() - 111; 
var width = $(window).width(); 
$("#epiceditor").height(height);
$("#epiceditor").width(width);
}
 





    }, 
    clean: function () {
    }
  });
  return ExamplePage;
});
