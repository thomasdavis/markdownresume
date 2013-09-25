define([
  'jquery',
  'underscore',
  'backbone',
  'mustache',
  'models/session',
  'models/resume',
  'text!templates/home/page.html',
  'epiceditor'
], function($, _, Backbone, Mustache, Session, Resume, homeTemplate, marked){
  var ExamplePage = Backbone.View.extend({
    el: '.page',
    initialize: function () {
      var that = this;
      Session.on('change:auth', function (session) {
        that.render();
      });
      this.resume = new Resume;

    },
    events: {
      'click .save-resume': 'saveResume' 
    },
    saveResume: function () {
      var that = this;
      $('.save-resume').removeClass('btn-success').addClass('btn-danger').text('Saving');
      this.resume.save({markdown: that.editor.exportFile()}, {
        success: function () {
          $('.save-resume').addClass('btn-success').removeClass('btn-warning').text('Save');
        }, 
        error: function () {
          $('.save-resume').addClass('btn-success').removeClass('btn-warning').text('Save');
        }
      });
    },
    render: function () {
        var that = this;
        this.$el.hide();
        $('.navbar-nav .edit-link').addClass('active');
        
        if(Session.get('auth')){

that.resume.fetch({
  success: function (resume) {
          that.$el.html(Mustache.render(homeTemplate, {resumeid: resume.id, email: Session.get('email')}));
        that.$el.fadeIn(250);

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
    if(window.location.host === 'localhost') {
      opts.theme = {
        base: 'css/epiceditor/themes/base/epiceditor.css',
        preview: 'css/epiceditor/themes/preview/github.css',
        editor: 'css/epiceditor/themes/editor/epic-light.css'
      }
    } else {

      opts.theme = {
        base: '/css/epiceditor/themes/base/epiceditor.css',
        preview: '/css/epiceditor/themes/preview/github.css',
        editor: '/css/epiceditor/themes/editor/epic-light.css'
      }
    }
var height = $(window).height() - 180; 
$("#epiceditor").height(height);
        window.onresize = function() {
var height = $(window).height() - 180; 
var width = $(window).width(); 
$("#epiceditor").height(height);
$("#epiceditor").width(width);
}


    that.editor = new EpicEditor(opts).load();

  }
})

        } else {
          that.$el.html(Mustache.render(homeTemplate, {email: null, resumeid: null, errors: Session.get('errors'), _: _})); 
        that.$el.fadeIn(250);
        }


        





    }, 
    clean: function () {
    }
  });
  return ExamplePage;
});
