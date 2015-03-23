var Misc = require('./misc');
var Games = require('./games');

exports.endpoints = [
  { path: '/', method: 'GET', config: Misc.home },
  { path: '/game/{id}', method: 'GET', config: Games.get},
  { path: '/games', method: 'GET', config: Games.list}
];
