var Misc = require('./misc');
var Games = require('./games');
var Boards = require('./boards');

exports.endpoints = [
  { path: '/', method: 'GET', config: Misc.home },
  { path: '/games/{id}', method: 'GET', config: Games.get},
  { path: '/games', method: 'GET', config: Games.list},
  { path: '/boards', method: 'GET', config: Boards.list},
  { path: '/admin', method: 'GET', config: Misc.admin}
];
