//var Joi = require('joi');
var Routes = require('./routes');
var Api = require('./api');
//var Basic = require('hapi-auth-basic');

//Declare internals

var internals = {};

exports.register = function(server, options, next){
  var api = new Api(options);

  server.bind({
    config: options,
    api: api
  });

  server.views({
    engines: {jade: require('jade')},
    relativeTo: __dirname,
    path: './views',
    context: require('./global-context.js'),
    compileOptions: {
      colons: true,
      pretty: true
    }
  });
  server.route(Routes.endpoints);
  server.route({
    method: 'GET',
    path: '/{path*}',
    config: {
        handler: {
            directory: {
                path: __dirname + '/static'
            }
        }
    }
  });

  server.ext('onPreResponse', internals.onPreResponse);

  return next();
};

exports.register.attributes = {
  pkg: require('../package.json')
};

internals.onPreResponse = function(request, reply){
  //Redirect error responses to errorpage
  if (request.response.isBoom){
    var error = request.response;
    var code = error.output.statusCode;
    var message = (error.message ? error.output.payload.message : 'Page not found (default)');
    return reply.view('layout_error',{
      page: 'error',
      code: code,
      message: message
    });
  }

  // Valid reply
  return reply.continue();
};
