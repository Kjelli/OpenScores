var Joi = require('joi');
var Boom = require('boom');

var home = {
  handler: function(request, reply){
    reply.view('index', {
      title: 'Hello It Worked!',
      message: 'Hi there chap!'
    });
  }
}

var get = {
  handler: function(request, reply){
    this.api.call('GET', '/api/games/' + request.params.id, '', function(err, code, payload){
      if(err){

        reply(Boom.create(404, 'Game not found...'));
      } else if(code === 200 && payload){

        reply.view('game', {
          game: payload,
          status: 'OK'
        });
      } else {

        reply(Boom.create(500, 'Something went wrong...'));
      }
    });
  },
  validate: {
    params: {
      id: Joi.number().min(0).required()
    }
  }
}


exports.endpoints = [
  { path: '/', method: 'GET', config: home },
  { path: '/game/{id}', method: 'GET', config: get}
];
