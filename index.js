var Hapi = require('hapi');
var Config = require('./config');
var Path = require('path');
var Good = require('good');

//Declare internals

var internals = {};

Config.server.web.uri = (Config.server.web.tls ? 'https://' : 'http://') + Config.server.web.host + ':' + Config.server.web.port;
Config.server.api.uri = (Config.server.api.tls ? 'https://' : 'http://') + Config.server.api.host + ':' + Config.server.web.port;

var server = new Hapi.Server();

server.bind({
  app: {
    config: Config
  }
});

server.connection(Config.server.api);
server.connection(Config.server.web);


server.register(
  [
    {
      register: require('./plugins/api'),
      options: {config: Config},
      select: 'api'
    },
    {
      register: require('./plugins/web'),
      options: {config: Config},
      select: 'web'
    },
    {
      register: Good,
      options: {
        reporters: [{
          reporter: require('good-console'),
          args:[{ log: '*', response: '*' }]
        }]
      }
    }
  ], function(err){
    if(err){
      console.error('Failed to load plugin: ', err);
    }

    server.start(function(){
      console.log("MyHapiLife server started @", server.info.uri);
    });
  }
);
