define(
  [
    'underscore',
    'backbone',
    'text!templates/partial/notify.utpl'
  ], function(_, Backbone, NotifyTemplate) {
    return Backbone.View.extend({
      initialize: function(opts) {
        this.notification = {
          class: opts.class,
          data: opts.data,
          text: opts.text
        };
      },
      template: _.template(NotifyTemplate),
      render: function() {
        this.$el.html(this.template({notification: this.notification}));
      },
      clear: function() {
        this.$el.html('');
      }
    });
  }
);
