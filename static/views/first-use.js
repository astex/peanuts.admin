define(
  [
    'underscore',
    'backbone',
    'text!templates/first-use.utpl',
    'css!styles/first-use'
  ], function(
    _,
    Backbone,
    FirstUseTemplate
  ) {
    return function() {
      var View = Backbone.View.extend({
        el: 'body',
        template: _.template(FirstUseTemplate),
        title: 'Register First User',
        render: function() {
          this.$el
            .addClass('first-use')
            .html(this.template());
        }
      });

      return new View();
    };
  }
);
