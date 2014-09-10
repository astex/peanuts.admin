require.config({
  paths: {
    jquery: 'lib/jquery-1.10.2.min',
    underscore: 'lib/underscore',
    backbone: 'lib/backbone'
  },
  shim: {
    jquery: {
      exports: '$'
    },
    underscore: {
      exports: '_'
    },
    backbone: {
      deps: ['jquery', 'underscore'],
      exports: 'Backbone'
    }
  }
});

require(['backbone'], function(Backbone) {
  var
    Router = Backbone.Router.extend({
      routes: {
        'first-use': 'firstUse'
      },
      render: function(controllerFile) {
        var router = this;

        require([controllerFile], function(controller) {
          router.view = controller();
        });
      },
      firstUse: function() {
        this.render('views/first-use');
      }
    }),
    router = new Router();

  Backbone.history.start();
});
