define(
  [
    'underscore',
    'backbone',
    'models/user',
    'text!templates/first-use.utpl',
    'css!styles/first-use'
  ], function(
    _,
    Backbone,
    UserModels,
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
        },
        events: {
          'click #register': 'register'
        },
        register: function() {
          var
            view = this,
            user = new UserModels.User({
              is_admin: true,
              email: view.$('#email').val(),
              username: view.$('#username').val(),
              password: view.$('#password').val(),
              'confirm': view.$('#confirm').val(),
              remember: view.$('#remember').prop('checked')
            });

          user.save({
            success: function() {},
            error: function() {}
          });
        }
      });

      return new View();
    };
  }
);
