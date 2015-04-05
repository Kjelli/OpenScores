var Joi = require('joi');
var Boom = require('boom');


exports.list = {
    handler: function (request, reply) {
        this.api.call('GET', '/api/games', '', function (err, code, payload) {
            if (err) {
                return reply(Boom.create(500, 'Something went wrong...'));
            }

            if (code === 200 && payload) {

                return reply.view('gamelist', {
                    page: 'games',
                    games: payload
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

                return reply.view('game', {
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
