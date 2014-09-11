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
    'pure': '//yui.yahooapis.com/pure/0.5.0/pure-min'
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
      'css': 'require-css'
    }
  }
});

require(['jquery', 'backbone', 'css!pure'], function($, Backbone) {
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

  // Configure the global app header.
  $.ajaxSetup({
    beforeSend: function(xhr) {
      xhr.setRequestHeader(
        'x-peanuts-application',
        '6752e4b0-8122-4c9a-ad1d-19d703fdfed0'
      );
    }
  });

  Backbone.history.start();
});
