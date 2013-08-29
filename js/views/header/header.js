define([
  'jquery',
  'underscore',
  'backbone',
  'models/session',
  'mustache',
  'text!templates/header/layout.html',
  'bootstrap'
], function($, _, Backbone, Session, Mustache, headerLayoutTemplate, bootstrap){
  var HeaderView = Backbone.View.extend({
    el: '.header',
    initialize: function () {
      var that = this;
      Session.on('change:auth', function (session) {
     //   that.render();
      });
      Session.on('change:errors', function (errors) {
       // that.render();
      });
    },
    events: {
      'click .login-button': 'showLogin',
      'click .signup-button': 'showSignup'
    },
    render: function () {
      this.$el.hide().fadeIn(250);
      this.$el.html(Mustache.render(headerLayoutTemplate, {username: Session.get('login')}));


    },
    showLogin: function () {
      $('#login-modal').modal()

    },
    showSignup: function () {
      $('#signup-modal').modal()
    }
  });
  return HeaderView;
});
