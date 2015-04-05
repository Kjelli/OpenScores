var db = require("./dbgames");
var Joi = require('joi');
var Boom = require('boom');

exports.post = {
  handler: function(request, reply){

    db.post(request.payload, function(err, game){

      if (err) {
          return reply(err);
      }
      return reply(game);
    });
  },
  validate: {
    payload: {
      gameName: Joi.string().required().min(5).max(40).description('Name of the game to add'),
      gameDescription: Joi.string().required().min(10).max(255).description('Description of the game to add'),
      gameOwner: Joi.string().required().min(3).max(40).description('Owner of the game to add')
    }
  }
};

exports.list = {
  handler: function(request, reply){

    var options = {
      limit: request.query.limit,
      queries: {
        gameName: request.query.name
      }
    }

    db.list(options, function(err, games){

      if(err){
        return reply(err);
      };

      reply(JSON.stringify(games));

    });
  },
  validate: {
    query: {
      limit: Joi.number().integer().min(1).max(100).default(10).description('Limit the search results'),
      name: Joi.string().min(0).max(40).default(undefined).description('Filter on name')
    }
  }
};

exports.get = {
  handler: function(request, reply){

    db.get(request.params.id, function(err, game){

      if (err) {
          return reply(err);
      }
      return reply(JSON.stringify(game));
    });
  },
  validate: {
    params: {
      id: Joi.number().min(0).required()
    }
  }
};
