// Filename: router.js
define([
  'require',
  'jquery',
  'underscore',
  'backbone',
	'vm'
], function (require, $, _, Backbone, Vm) {
  var AppRouter = Backbone.Router.extend({
    routes: {

      '': 'home',
      ':username': 'defaultAction' // All urls will trigger this route
    },

  });

  var initialize = function(options){

		var appView = options.appView;
    var router = new AppRouter(options);
    Backbone.router = router;
    router.on('route:home', function () {
      console.log('home');
      require(['views/home/page'], function (HomeView) {
        var homeView = Vm.create(appView, 'page', HomeView, {});
        homeView.render();
      });
    });
		router.on('route:defaultAction', function (username) {
		});

  };
  return {
    initialize: initialize
  };
});
