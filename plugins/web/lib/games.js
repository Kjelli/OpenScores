var Joi = require('joi');

var Moment = require('moment');
var Boom = require('boom');
var listify = require('./listify');

/*
  Decorate the given game object with keys:
  new: true if the game is less than 3 days old from Moment() (now)
*/
var preprocess = function(game){
  if(Array.isArray(game)){
    for(var i = 0; i < game.length; i ++){
      preprocess(game[i]);
    }
    return;
  }

  // 2015-03-26T16:54:09Z  ===>  [2015, 03, 26, 16, 54, 09]
  var t = game.created.split(/[- :TZ]/);

  // Moment object from creation-timestamp
  var created = Moment({y: t[0], M: t[1]-1, d: t[2], h: t[3], m: t[4], s: t[5]});
  var now = Moment();

  var days = now.diff(created, 'days');

  if(days <3){
    game.new = true;
  }
  console.log(created.format('MMMM Do YYYY, h:mm:ss a'));
  game.createdPretty = created.format('MMMM Do YYYY');
}

exports.list = {
  handler: function(request, reply){
    this.api.call('GET', '/api/games?limit=' + request.query.limit + (request.query.name ? '&name=' + request.query.name : '') , '', function(err, code, payload){
      if(err){
        reply(Boom.create(500, 'Something went wrong...'));
        return;
      }

      if(code === 200 && payload){
        preprocess(payload);
        return reply.view('layout_games', {
          page: 'games',
          limit: Math.min(payload.length, request.query.limit),
          gamelist: listify(payload, {
            idKey: 'gameId',
            nameKey: 'gameName',
            listClass: 'games-list',
            itemClass: 'games-list-item',
            href: '/games/'
          })
        });
      }

      return reply(Boom.create(500, 'Something went wrong...'));
    });
  },
  validate: {
    query: {
      limit: Joi.number().integer().min(1).max(20).default(10),
      name: Joi.string().max(40).default(undefined)
    }
  }
};

exports.get = {
    handler: function (request, reply) {
        this.api.call('GET', '/api/games/' + request.params.id, '', function (err, code, payload) {
            if (err) {

                return reply(Boom.create(404, 'Game not found...'));
            }

            if (code === 200 && payload) {
                preprocess(payload);
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
