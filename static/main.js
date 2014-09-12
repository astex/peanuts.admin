// Admin main
//
// This is the main execution loop of the admin panel. It provides basic
// configuration, routing, and default imports.

require.config({
  paths: {
    'jquery': 'lib/jquery-1.10.2.min',
    'underscore': 'lib/underscore',
    'backbone': 'lib/backbone',
    'require-css': 'lib/require-css.min',
    'require-text': 'lib/require-text',
    'pure-min': '//yui.yahooapis.com/pure/0.5.0/pure-min',
    'pure-responsive': '//yui.yahooapis.com/pure/0.5.0/grids-responsive-min'
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
  },
  map: {
    '*': {
      'css': 'require-css',
      'text': 'require-text'
    }
  }
});

require(
  [
    'jquery',
    'backbone',
    'css!pure-min',
    'css!pure-responsive'
  ], function($, Backbone) {
  var
    add_app_header = function(xhr) {
      xhr.setRequestHeader(
        'x-peanuts-application',
        '6752e4b0-8122-4c9a-ad1d-19d703fdfed0'
      );
    };

  // The whole thing is wrapped in the success callback of a GET request for the
  //  CSRF token. This is necessary since all requests to the peanuts API will
  //  fail without it.
  $.ajax({
    url: '/csrf/',
    beforeSend: add_app_header,
    success: function(data) {
      var
        add_csrf_token = function(xhr) {
          xhr.setRequestHeader(
            'x-peanuts-csrf',
            data.csrf
          );
        },
        Router = Backbone.Router.extend({
          routes: {
            'first-use': 'firstUse'
          },
          render: function(controllerFile) {
            var router = this;

            require([controllerFile], function(controller) {
              router.view = controller();
              router.view.render();

              $(document).prop(
                'title',
                $(document).prop('title') + ' - ' + router.view.title
              );
            });
          },
          firstUse: function() {
            this.render('views/first-use');
          }
        }),
        router = new Router(),

        // The old backbone.sync method is retreived here so that the new one
        //  can call it.
        old_sync = Backbone.sync;

      // We redefine the global app header here to add in the csrf token.
      Backbone.sync = function(method, model, options) {
        var beforeSend = options.beforeSend;

        options.beforeSend = function(xhr) {
          add_app_header(xhr);
          add_csrf_token(xhr);

          if (beforeSend) {
            beforeSend(xhr);
          }
        };

        // Call the default method with our modified options.
        old_sync(method, model, options);
      };

      Backbone.history.start();
    }
  });
});
