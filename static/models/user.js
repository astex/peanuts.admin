define(['backbone'], function(Backbone) {
  var Models = {url: '/api/user/'};

  Models.User = Backbone.Model.extend({
    url: function() { return Models.url + (this.id || ''); },
    parse: function(data) { return data.data; }
  });

  return Models;
});
