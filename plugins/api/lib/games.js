<<<<<<< HEAD
var db = require("./dbgames");
=======
var db = require('./db');
>>>>>>> origin/master
var Joi = require('joi');
var Boom = require('boom');

exports.post = {
  handler: function(request, reply){

    db.post(request.payload, function(err, game){

      if (err) {
          return reply(Boom.create(500, err.message));
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

    db.list(function(err, games){

<<<<<<< HEAD
      if(err){
        reply(Boom.create(500, err.message));
        return;
      };

      reply(JSON.stringify(games));
=======
        if (err) {
            return reply(Boom.create(500, err.message));
        }
      return reply(JSON.stringify(games));
>>>>>>> origin/master
    });
  }
};

exports.get = {
  handler: function(request, reply){

    db.get(request.params.id, function(err, game){

        if (err) {
            return reply(Boom.create(500, err.message));
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
