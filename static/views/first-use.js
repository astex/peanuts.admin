define(
  [
    'underscore',
    'backbone',
    'models/user',
    'views/notify',
    'text!templates/first-use.utpl',
    'css!styles/first-use'
  ], function(
    _,
    Backbone,
    UserModels,
    NotifyView,
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
        new_notification_view: function(class_, data) {
          if (this.notification_view) {
            this.notification_view.clear();
          }
          this.notification_view = new NotifyView({
            el: this.$('.notifier'),
            class: class_,
            data: data
          });
          this.notification_view.render();
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

          user.save({},{
            success: function() {},
            error: function(model, response) {
              view.new_notification_view('error', response.responseJSON);
            }
          });
        }
      });

      return new View();
    };
  }
);
