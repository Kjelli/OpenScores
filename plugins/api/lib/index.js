var Routes = require('./routes');

//Declare internals
var internals = {};

exports.register = function (plugin, options, next) {
  plugin.route(Routes.endpoints);
  next();
};

exports.register.attributes = {
  pkg: require('../package.json')
};
