define(['models/base'], function(BaseModels) {
  var Models = {url: '/api/user/'};

  Models.User = BaseModels.Model.extend({
    baseUrl: Models.url
  });

  return Models;
});
