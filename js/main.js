	// require.js path aliases
require.config({
  paths: {
    // Major libraries
    jquery: 'libs/jquery/jquery-min',
    underscore: 'libs/underscore/underscore', // https://github.com/amdjs
    backbone: 'libs/backbone/backbone', // https://github.com/amdjs
    prettyprint: 'libs/prettyprint/prettyprint',
    qtip: 'libs/qtip2/jquery.qtip.min',
    mustache: 'libs/mustache/mustache',
    epiceditor: 'libs/epiceditor/epiceditor',
    bootstrap: 'libs/bootstrap/bootstrap',
    // APIe
    modal: 'libs/modal/modal',
    form: 'libs/form/form',
    // Require.js plugins
    text: 'libs/require/text',
    // jquery plugins
    autogrow : 'libs/autogrow/autogrow',
    // External services

    // Just a short cut so we can put our html outside the js dir
    // When you have HTML/CSS designers this aids in keeping them out of the js directory
    templates: '../templates',
    legal: '../legal'
  }

});


// Actually kick off the application

require([
  'views/app',
  'vm',
  'router',
  'clicky'
], function(AppView, Vm, Router, norefclicky){


  try{ clicky.init(66633495); }catch(e){}

  var appView = Vm.create({}, 'AppView', AppView);

  Router.initialize({appView : appView});
  appView.render(); // render() calls Backbone.history when its ready to start

});

