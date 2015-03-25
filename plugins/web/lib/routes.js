var Misc = require('./misc');
var Games = require('./games');
var Scoreboards = require('./scoreboards');

exports.endpoints = [
  { path: '/', method: 'GET', config: Misc.home },
  { path: '/game/{id}', method: 'GET', config: Games.get},
  { path: '/games', method: 'GET', config: Games.list},
  { path: '/scoreboards', method: 'GET', config: Scoreboards.list},
  { path: '/admin', method: 'GET', config: Misc.admin}
];
