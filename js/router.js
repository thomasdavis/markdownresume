// Filename: router.js
define([
  'require',
  'jquery',
  'underscore',
  'backbone',
	'vm',
  'views/home/page'
], function (require, $, _, Backbone, Vm,HomeView) {
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
        var homeView = Vm.create(appView, 'page', HomeView, {});
        homeView.render();
    });
		router.on('route:defaultAction', function (username) {
		});

  };
  return {
    initialize: initialize
  };
});
