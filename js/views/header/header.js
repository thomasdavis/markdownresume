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
        console.log('USERNAME', session.get('auth'))
        if(session.get('auth')) {
          $('#login-modal').modal('hide');
          $('#signup-modal').modal('hide');
            setTimeout(function(){that.render()}, 250);
        } else {
            that.render();
        }
      });
    },
    events: {
      'click .login-button': 'showLogin',
      'click .signup-button': 'showSignup',
      'submit .signup-form': 'signup',
      'submit .login-form': 'login',
      'click .logout-button': 'logout'
    },
    render: function () {

      console.log('USERNAME2', Session.get('auth'), Session)
      this.$el.hide().fadeIn(250);
      this.$el.html(Mustache.render(headerLayoutTemplate, {username: Session.get('email')}));


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

      user.save(details, {
        success:function(user){
          console.log('reg')
          Session.getAuth(function(){});
        }
      })
      return false;
    },
    login: function (ev) {
      var details = $(ev.currentTarget).serializeObject();
      Session.login(details, function () {
      });
      return false;
    },
    logout: function (ev) {
      Session.logout();
      return false;
    }
  });
  return HeaderView;
});
