define(['jquery', 'backbone'], function($, Backbone) {
  return {
    Model: Backbone.Model.extend({
      url: function() {
        return this.baseUrl + (this.id || '') + '?' + $.param({
          verbosity: this.verbosity
        });
      },
      parse: function(data) {
        return data.data;
      }
    })
  };
});
