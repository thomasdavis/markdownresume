define([
  'jquery',
  'underscore',
  'backbone',
  'models/session',
  'mustache',
  'text!templates/header/layout.html',
  'bootstrap',
  'models/user'
], function($, _, Backbone, Session, Mustache, headerLayoutTemplate, bootstrap, User){
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
      'click .signup-button': 'showSignup',
      'submit .signup-form': 'signup',
      'submit .login-form': 'login'
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
    },
    signup: function (ev) {
      var user = new User();
      var details = $(ev.currentTarget).serializeObject();

      user.save(details, function(user){
        alert('a');
      })
      return false;
    },
    login: function (ev) {
      var details = $(ev.currentTarget).serializeObject();
      Session.login(details);
      return false;
    }
  });
  return HeaderView;
});
