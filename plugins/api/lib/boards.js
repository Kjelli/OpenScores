var Joi = require('joi');
var db = require('./dbboards');
var Boom = require('boom');

exports.post = {
  handler: function(request, reply){

    db.post(request.payload, function(err, board){

      if(err) reply(Boom.create(500, err.message));
      else reply(board);

    });
  },
  validate: {
    payload: {
      //TODO
    }
  }
};

exports.list = {
  handler: function(request, reply){

    db.list(function(err, boards){

      if(err){
        reply(Boom.create(500, err.message));
        return;
      };

      reply(JSON.stringify(boards));
    });
  }
};

exports.get = {
  handler: function(request, reply){

    db.get(request.params.id, function(err, board){

      if(err) reply(Boom.create(500, err.message));
      else reply(JSON.stringify(board));
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

      if(err) reply(Boom.create(500, err.message));
      else reply(JSON.stringify(board));
    });
  },
  validate: {
    params: {
      id: Joi.number().min(0).required()
    }
  }
}
