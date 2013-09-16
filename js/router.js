// Filename: router.js
define([
  'require',
  'jquery',
  'underscore',
  'backbone',
	'vm',
  'views/home/page',
  'views/home/resume'
], function (require, $, _, Backbone, Vm,HomeView, ResumeView) {
  var AppRouter = Backbone.Router.extend({
    routes: {

      '': 'home',
      'resume/:id': 'resume',
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
    router.on('route:resume', function (id) {
      console.log('home');
        var resumeView = Vm.create(appView, 'page', ResumeView, {id: id});
        resumeView.render();
    });
		router.on('route:defaultAction', function (username) {
		});

  };
  return {
    initialize: initialize
  };
});
