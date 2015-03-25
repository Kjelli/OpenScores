var Joi = require('joi');
var Routes = require('./routes');
var Api = require('./api');
var Basic = require('hapi-auth-basic');

//Declare internals

var internals = {};

exports.register = function(plugin, options, next){
  var api = new Api(options);

  plugin.bind({
    config: options,
    api: api
  });

  plugin.views({
    engines: {jade: require('jade')},
    relativeTo: __dirname,
    path: './views',
    context: require('./global-context.js'),
    compileOptions: {
      colons: true,
      pretty: true
    }
  });
  plugin.route(Routes.endpoints);
  plugin.route({
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

  plugin.ext('onPreResponse', internals.onPreResponse);

  return next();
}

exports.register.attributes = {
  pkg: require('../package.json')
}

internals.onPreResponse = function(request, reply){

  //Redirect error responses to errorpage
  if(request.response.isBoom){
    var error = request.response;
    var code = error.output.statusCode;
    var message = (error.output.payload.message ? error.output.payload.message : 'Page not found (default)');
    return reply.view('error', {code: code, message: message});
  }

  // Valid reply
  return reply.continue();
}
