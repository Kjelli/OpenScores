var Joi = require('joi');
var games = require('./games');
var boards = require('./boards');

exports.endpoints = [
<<<<<<< HEAD
  {path: "/api/games", method: "POST", config: games.post},
  {path: "/api/games", method: "GET", config: games.list},
  {path: "/api/games/{id}", method: "GET", config: games.get},

  {path: "/api/boards", method: "POST", config: boards.post},
  {path: "/api/boards", method: "GET", config: boards.list},
  {path: "/api/boards/{id}", method: "POST", config: boards.get},
  {path: "/api/games/{id}/boards", method: "GET", config: boards.getByGame}
=======
  {path: '/api/games', method: 'POST', config: games.post},
  {path: '/api/games', method: 'GET', config: games.list},
  {path: '/api/games/{id}', method: 'GET', config: games.get}
>>>>>>> origin/master
];
