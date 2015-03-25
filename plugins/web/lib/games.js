var Joi = require('joi');


exports.list = {
  handler: function(request, reply){
    this.api.call('GET', '/api/games', '', function(err, code, payload){
      if(err){
        reply(Boom.create(500, 'Something went wrong...'));
        return;
      }

      if(code === 200 && payload){

        reply.view('gamelist', {
          page: 'games',
          games: payload
        });
      }else{

        reply(Boom.create(500, 'Something went wrong...'));
      }
    });
  }
}

exports.get = {
  handler: function(request, reply){
    this.api.call('GET', '/api/games/' + request.params.id, '', function(err, code, payload){
      if(err){

        reply(Boom.create(404, 'Game not found...'));
      } else if(code === 200 && payload){

        reply.view('game', {
          page: 'games',
          game: payload
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
