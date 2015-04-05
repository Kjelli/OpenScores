var Joi = require('joi');

var Moment = require('moment');
var Boom = require('boom');
var listify = require('./listify');

var preprocess = function(game){
  if(Array.isArray(game)){
    for(var i = 0; i < game.length; i ++){
      preprocess(game[i]);
    }
    return;
  }

  var t = game.created.split(/[- :TZ]/);

  var created = Moment({y: t[0], M: t[1]-1, d: t[2], h: t[3], m: t[4], s: t[5]});
  var now = Moment();

  var days = now.diff(created, 'days');

  if(days <3){
    game.new = true;
  }
}

exports.list = {
  handler: function(request, reply){
    this.api.call('GET', '/api/games', '', function(err, code, payload){
      if(err){
        reply(Boom.create(500, 'Something went wrong...'));
        return;
      }
      console.log(JSON.stringify(payload, null, '\t'));
      console.log(code);
      if(code === 200 && payload){
        preprocess(payload);
        return reply.view('layout_games', {
          page: 'games',
          gamelist: listify(payload, {
            idKey: 'gameId',
            nameKey: 'gameName',
            listClass: 'games-list',
            itemClass: 'games-list-item',
            labelClass: 'label-game',
            href: '/games/'
          })
        });
      }

      return reply(Boom.create(500, 'Something went wrong...'));
    });
  }
};

exports.get = {
    handler: function (request, reply) {
        this.api.call('GET', '/api/games/' + request.params.id, '', function (err, code, payload) {
            if (err) {

                return reply(Boom.create(404, 'Game not found...'));
            }

            if (code === 200 && payload) {

                return reply.view('layout_game', {
                    page: 'games',
                    game: payload
                });
            }

            return reply(Boom.create(500, 'Something went wrong...'));
        });
    },
    validate: {
        params: {
            id: Joi.number().min(0).required()
        }
    }
};
