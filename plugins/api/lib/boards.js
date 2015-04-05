var Joi = require('joi');
var db = require('./dbboards');
var Boom = require('boom');

exports.post = {
  handler: function(request, reply){

    db.post(request.payload, function(err, board){

      if(err){
        return reply(err);
      }

      reply(board);

    });
  },
  validate: {
    payload: {
      //TODO
    }
  }, app: {
    isApi: true
  }
};

exports.list = {
  handler: function(request, reply){

    db.list(function(err, boards){

      if(err){
        return reply(err);
      };

      reply(JSON.stringify(boards));
    });
  }
};

exports.get = {
  handler: function(request, reply){

    db.get(request.params.id, function(err, board){

      if(err){
        return reply(err);
      }

      reply(JSON.stringify(board));
    });
  },
  validate: {
    params: {
      id: Joi.number().min(0).required()
    }
  }
};

exports.getByGame = {
  handler: function(request, reply){

    db.getByGame(request.params.id, function(err, board){

      if(err){
        return reply(err);
      }

      reply(JSON.stringify(board));
    });
  },
  validate: {
    params: {
      id: Joi.number().min(0).required()
    }
  }
}
