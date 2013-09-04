define([
  'jquery',
  'underscore',
  'backbone',
  'extensions',
  'vm',
  'models/session',
  'models/error',
  'text!templates/layout.html',
  'views/header/header',
], function($, _, Backbone, extensions, Vm, Session, ErrorModel, layoutTemplate, HeaderView){
  var AppView = Backbone.View.extend({
    el: 'body',
    initialize: function () {
 // log all 500 error codes with the server. We may also log others - this is done in libs/form/form.js
 // when no UI elements are found for handling a valid server error condition.
      // This snipper should usually be loaded elsewhere
      // It simply takes a <form> and converts its values to an object
      $.fn.serializeObject = function() {
          var o = {};
          var a = this.serializeArray();
          $.each(a, function() {
              if (o[this.name] !== undefined) {
                  if (!o[this.name].push) {
                      o[this.name] = [o[this.name]];
                  }
                  o[this.name].push(this.value || '');
              } else {
                  o[this.name] = this.value || '';
              }
          });
          return o;
      };

      var that = this;
 $.ajaxPrefilter( function( options, originalOptions, jqXHR ) {
        // Your server goes below
        if(window.location.host === 'markdownresume.com') {
          options.url = 'http://resumeserver.herokuapp.com' + options.url;

        } else {
          options.url = 'http://localhost:8080' + options.url;
        }
        //options.url = 'http://192.168.2.111:3000' + options.url;
      //  }// else {
        //options.url = 'http://d3gscmgl75g1oq.cloudfront.net' + options.url;

       // };
      });

    },
    render: function () {

			var that = this;
      $(this.el).html(layoutTemplate);




      Session.getAuth(function () {
        
      var headerView = new HeaderView();
      headerView.render();
        $('body').on('click', 'a', function (e) {
          if($(this).attr('href').substr(0,4) === 'http' || $(this).attr('href').substr(0,4) === 'mail') {

          } else {
            clicky.log($(this).attr('href'), $(this).attr('href'), 'pageview')
           // mixpanel.track_pageview();
            Backbone.router.navigate($(this).attr('href'), true);
            $(document).scrollTop(0);
            return false;

          }
        });
   var root = '/';
        if(window.location.hostname === 'localhost') {
          root = '/repos/resume/';
        }
        Backbone.history.start({pushState: true, root: root});
      });


		}
	});
  return AppView;
});
