define([
  'underscore',
  'backbone'
], function(_, Backbone) {
  var ResumeModel = Backbone.Model.extend({
    urlRoot: '/resume'

  });
  return ResumeModel;

});
