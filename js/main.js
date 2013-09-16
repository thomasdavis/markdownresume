	// require.js path aliases
require.config({
  paths: {
    // Major libraries
    jquery: 'libs/jquery/jquery-min',
    underscore: 'libs/underscore/underscore', // https://github.com/amdjs
    backbone: 'libs/backbone/backbone', // https://github.com/amdjs
    mustache: 'libs/mustache/mustache',
    epiceditor: 'libs/epiceditor/epiceditor',
    bootstrap: 'libs/bootstrap/bootstrap',
    // APIe
    form: 'libs/form/form',
    // Require.js plugins
    text: 'libs/require/text',
    // jquery plugins
    // External services

    // Just a short cut so we can put our html outside the js dir
    // When you have HTML/CSS designers this aids in keeping them out of the js directory
    templates: '../templates',
  }

});


// Actually kick off the application

require([
  'views/app',
  'vm',
  'router',
  'clicky'
], function(AppView, Vm, Router, norefclicky){


  try{ clicky.init(100653611); }catch(e){}

  var appView = Vm.create({}, 'AppView', AppView);

  Router.initialize({appView : appView});
  appView.render(); // render() calls Backbone.history when its ready to start

});

