// Load modules

var Request = require('request');
//var Oz = require('oz'); TODO!!Not Installed!!TODO


// Declare internals
var internals = {};

module.exports = internals.Client = function(options){
  this.settings = options;
  this.ticket = null;
}

// Make API call w/ client token

internals.Client.prototype.call = function(method, path, body, callback){
  body = (body !== null ? JSON.stringify(body) : null);

  var uri = 'http://' + this.settings.config.server.api.host + ':' + this.settings.config.server.api.port + path;
  var headers = {};

  var options = {
    uri: uri,
    method: method,
    headers: headers,
    body: body
  }

  Request(options, function(err, response, body){
    if (err){
      return callback(err);
    }

    var payload = null;
    try{
      payload = JSON.parse(body);
    }catch(e){
      return callback(e);
    }

    return callback(null, response.statusCode, payload);

  });

}
