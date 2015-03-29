var Hapi = require('hapi');
var Config = require('./config');
var Hoek = require('hoek');
var Good = require('good');

//Declare internals

var internals = {};

Config.server.web.uri = (Config.server.web.tls ? 'https://' : 'http://') + Config.server.web.host + ':' + Config.server.web.port;
Config.server.api.uri = (Config.server.api.tls ? 'https://' : 'http://') + Config.server.api.host + ':' + Config.server.api.port;

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
            register: require('./plugins/api/lib'),
            options: {config: Config},
            select: 'api'
        },
        {
            register: require('./plugins/web/lib'),
            options: {config: Config},
            select: 'web'
        },
        {
            register: Good,
            options: {
                reporters: [{
                    reporter: require('good-console'),
                    args: [{log: '*', response: '*'}]
                }]
            }
        }
    ], function (err) {
        Hoek.assert(!err, err);

        server.start(function (err) {
            Hoek.assert(!err, err);
            for (var i = 0, n = server.connections.length; i < n; i++) {
                console.log('MyHapiLife server started @', server.connections[i].info.uri);
            }
        });
    }
);
