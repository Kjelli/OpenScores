var Joi = require('joi');
var games = require('./games');

exports.endpoints = [
  {path: '/api/games', method: 'POST', config: games.post},
  {path: '/api/games', method: 'GET', config: games.list},
  {path: '/api/games/{id}', method: 'GET', config: games.get}
];
